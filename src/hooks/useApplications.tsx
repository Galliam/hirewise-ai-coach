
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Application {
  id: string;
  job_id: string;
  applicant_id: string;
  status: string;
  applied_at: string;
  application_insights: any;
  updated_at: string;
  job: {
    title: string;
    department: string;
    location: string;
  };
  applicant: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  job_seeker_profile?: {
    desired_job_title: string;
    years_experience: number;
    technical_skills: string[];
    soft_skills: string[];
    salary_min: number;
    salary_max: number;
    current_company: string;
    current_title: string;
  };
}

export const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          job:jobs(title, department, location),
          applicant:profiles!applications_applicant_id_fkey(id, first_name, last_name, email),
          job_seeker_profile:job_seeker_profiles!job_seeker_profiles_user_id_fkey(
            desired_job_title,
            years_experience,
            technical_skills,
            soft_skills,
            salary_min,
            salary_max,
            current_company,
            current_title
          )
        `)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
      await fetchApplications(); // Refresh the list
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  return {
    applications,
    loading,
    refreshApplications: fetchApplications,
    updateApplicationStatus
  };
};
