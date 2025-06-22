
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface CareerUpdate {
  id: string;
  candidate_id: string;
  update_type: 'job_change' | 'promotion' | 'skill_added' | 'certification';
  title: string;
  description?: string;
  company?: string;
  created_at: string;
}

// Type guard to ensure update_type is valid
const isValidUpdateType = (type: string): type is CareerUpdate['update_type'] => {
  return ['job_change', 'promotion', 'skill_added', 'certification'].includes(type);
};

export const useCareerUpdates = () => {
  const { user } = useAuth();
  const [updates, setUpdates] = useState<CareerUpdate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUpdates = async (candidateId?: string) => {
    if (!user) return;
    
    setLoading(true);
    console.log('Fetching career updates for:', candidateId || user.id);
    
    try {
      const { data, error } = await supabase
        .from('career_updates')
        .select('*')
        .eq('candidate_id', candidateId || user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching career updates:', error);
        throw error;
      }

      console.log('Fetched career updates:', data);
      
      // Transform and validate the data
      const validUpdates: CareerUpdate[] = (data || []).filter((update: any) => {
        return isValidUpdateType(update.update_type);
      }).map((update: any) => ({
        ...update,
        update_type: update.update_type as CareerUpdate['update_type']
      }));
      
      setUpdates(validUpdates);
    } catch (error) {
      console.error('Error in fetchUpdates:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCareerUpdate = async (update: Omit<CareerUpdate, 'id' | 'candidate_id' | 'created_at'>) => {
    if (!user) return;

    console.log('Adding career update:', update);
    
    try {
      const { data, error } = await supabase
        .from('career_updates')
        .insert({
          candidate_id: user.id,
          ...update
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding career update:', error);
        throw error;
      }

      console.log('Career update added successfully:', data);
      await fetchUpdates();
      return { success: true };
    } catch (error: any) {
      console.error('Error in addCareerUpdate:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    if (user) {
      fetchUpdates();
    }
  }, [user]);

  return {
    updates,
    loading,
    fetchUpdates,
    addCareerUpdate
  };
};
