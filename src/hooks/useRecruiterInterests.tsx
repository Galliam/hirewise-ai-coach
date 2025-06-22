
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface RecruiterInterest {
  id: string;
  recruiter_id: string;
  candidate_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  updated_at: string;
  message?: string;
  recruiter?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
  candidate?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

// Type guard to ensure status is valid
const isValidStatus = (status: string): status is RecruiterInterest['status'] => {
  return ['pending', 'accepted', 'declined'].includes(status);
};

export const useRecruiterInterests = () => {
  const { user, userProfile } = useAuth();
  const [interests, setInterests] = useState<RecruiterInterest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInterests = async () => {
    if (!user) return;
    
    setLoading(true);
    console.log('Fetching recruiter interests for user:', user.id);
    
    try {
      let query = supabase
        .from('recruiter_interests')
        .select(`
          *,
          recruiter:profiles!recruiter_interests_recruiter_id_fkey(first_name, last_name, email),
          candidate:profiles!recruiter_interests_candidate_id_fkey(first_name, last_name, email)
        `);

      // If user is a recruiter, get interests they've expressed
      // If user is a job seeker, get interests received
      if (userProfile?.user_type === 'recruiter') {
        query = query.eq('recruiter_id', user.id);
      } else {
        query = query.eq('candidate_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching interests:', error);
        throw error;
      }

      console.log('Fetched interests:', data);
      
      // Transform and validate the data
      const validInterests: RecruiterInterest[] = (data || []).filter((interest: any) => {
        return isValidStatus(interest.status);
      }).map((interest: any) => ({
        ...interest,
        status: interest.status as RecruiterInterest['status']
      }));
      
      setInterests(validInterests);
    } catch (error) {
      console.error('Error in fetchInterests:', error);
    } finally {
      setLoading(false);
    }
  };

  const expressInterest = async (candidateId: string, message?: string) => {
    if (!user || userProfile?.user_type !== 'recruiter') return;

    console.log('Expressing interest in candidate:', candidateId);
    
    try {
      const { data, error } = await supabase
        .from('recruiter_interests')
        .insert({
          recruiter_id: user.id,
          candidate_id: candidateId,
          message: message,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error expressing interest:', error);
        throw error;
      }

      console.log('Interest expressed successfully:', data);
      await fetchInterests();
      return { success: true };
    } catch (error: any) {
      console.error('Error in expressInterest:', error);
      return { success: false, error: error.message };
    }
  };

  const updateInterestStatus = async (interestId: string, status: 'accepted' | 'declined') => {
    if (!user) return;

    console.log('Updating interest status:', interestId, status);
    
    try {
      const { error } = await supabase
        .from('recruiter_interests')
        .update({ status })
        .eq('id', interestId)
        .eq('candidate_id', user.id); // Ensure only the candidate can update

      if (error) {
        console.error('Error updating interest status:', error);
        throw error;
      }

      console.log('Interest status updated successfully');
      await fetchInterests();
      return { success: true };
    } catch (error: any) {
      console.error('Error in updateInterestStatus:', error);
      return { success: false, error: error.message };
    }
  };

  const getInterestScore = async (candidateId: string) => {
    try {
      const { data, error } = await supabase.rpc('calculate_interest_score', {
        candidate_profile_id: candidateId
      });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error calculating interest score:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (user && userProfile) {
      fetchInterests();
    }
  }, [user, userProfile]);

  return {
    interests,
    loading,
    fetchInterests,
    expressInterest,
    updateInterestStatus,
    getInterestScore
  };
};
