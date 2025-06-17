
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  skills_required: string[];
  recruiter_id: string;
  created_at: string;
}

const Jobs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error Loading Jobs",
        description: "Unable to load job listings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchPercentage = (job: Job) => {
    // Simple mock calculation - in a real app this would use user skills/preferences
    return Math.floor(Math.random() * 20) + 80;
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApply = async (jobId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to apply for jobs.",
          variant: "destructive"
        });
        return;
      }

      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('applicant_id', user.id)
        .single();

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job.",
          variant: "destructive"
        });
        return;
      }

      // Create application
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
          status: 'applied'
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your application has been sent to the recruiter.",
      });
    } catch (error) {
      console.error('Error applying for job:', error);
      toast({
        title: "Application Failed",
        description: "Unable to submit your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white px-4 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Hirewise</h1>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Hirewise</h1>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600">🔔</button>
              <button className="text-gray-600">👤</button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Matches</h2>
          </div>
          
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No job listings available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const matchPercentage = calculateMatchPercentage(job);
                return (
                  <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.department}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            📍 {job.location}
                          </span>
                          <span className="flex items-center">
                            💼 {job.job_type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{matchPercentage}%</span>
                        <span className="text-xs text-gray-500 block">match</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleViewJob(job.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        Read JD
                      </Button>
                      <Button 
                        onClick={() => handleApply(job.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Jobs;
