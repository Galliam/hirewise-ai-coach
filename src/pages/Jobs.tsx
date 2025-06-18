
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { JobMatchingAlgorithm, JobMatch } from "@/utils/jobMatchingAlgorithm";

const Jobs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMatchedJobs();
    }
  }, [user]);

  const fetchMatchedJobs = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const matches = await JobMatchingAlgorithm.getMatchedJobsForUser(user.id);
      setJobMatches(matches);
    } catch (error) {
      console.error('Error fetching matched jobs:', error);
      toast({
        title: "Error Loading Jobs",
        description: "Unable to load job recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApply = async (jobId: string) => {
    try {
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

      // Get application insights for the recruiter
      const insights = await JobMatchingAlgorithm.getApplicationInsights(jobId, user.id);

      // Create application with insights
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
          status: 'applied',
          application_insights: insights // Store insights for recruiter
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your application has been sent to the recruiter with match insights.",
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
              <p className="text-gray-600">Finding your perfect job matches...</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Job Matches</h2>
            <p className="text-sm text-gray-600">
              Showing jobs with 85%+ compatibility based on your preferences
            </p>
          </div>
          
          {jobMatches.length === 0 ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any jobs that match your preferences at 85% or higher. 
                  Try updating your profile or preferences to see more opportunities.
                </p>
                <Button 
                  onClick={() => navigate('/profile')}
                  variant="outline"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobMatches.map((jobMatch) => {
                const { job, matchScore, matchReasons } = jobMatch;
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
                        <span className="text-2xl font-bold text-blue-600">{matchScore}%</span>
                        <span className="text-xs text-gray-500 block">match</span>
                      </div>
                    </div>
                    
                    {/* Match reasons */}
                    {matchReasons.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Why you're a great fit:</h4>
                        <div className="space-y-1">
                          {matchReasons.slice(0, 2).map((reason, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className="text-green-500 text-xs mt-1">✓</span>
                              <span className="text-xs text-gray-600">{reason}</span>
                            </div>
                          ))}
                          {matchReasons.length > 2 && (
                            <span className="text-xs text-gray-500">+{matchReasons.length - 2} more reasons</span>
                          )}
                        </div>
                      </div>
                    )}
                    
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
