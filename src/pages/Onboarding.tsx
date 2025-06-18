
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingStep4 from "@/components/onboarding/OnboardingStep4";
import OnboardingStep5 from "@/components/onboarding/OnboardingStep5";
import OnboardingStep6 from "@/components/onboarding/OnboardingStep6";
import OnboardingStep7 from "@/components/onboarding/OnboardingStep7";

const TOTAL_STEPS = 7;

const Onboarding = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [jobSeekerProfile, setJobSeekerProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchJobSeekerProfile();
    }
  }, [user]);

  const fetchJobSeekerProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('job_seeker_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setJobSeekerProfile(data);
        setCurrentStep(data.onboarding_step || 1);
        
        // If already completed, redirect to dashboard
        if (data.onboarding_completed) {
          navigate('/dashboard');
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching job seeker profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOnboardingStep = async (step: number, data: any = {}) => {
    try {
      const { error } = await supabase
        .from('job_seeker_profiles')
        .update({
          ...data,
          onboarding_step: step,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      setJobSeekerProfile(prev => ({ ...prev, ...data, onboarding_step: step }));
    } catch (error) {
      console.error('Error updating onboarding step:', error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completeOnboarding = async () => {
    try {
      const { error } = await supabase
        .from('job_seeker_profiles')
        .update({
          onboarding_completed: true,
          onboarding_step: TOTAL_STEPS,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Onboarding Complete!",
        description: "Welcome to Hirewise. Let's find you the perfect job!",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNext = async (stepData?: any) => {
    if (stepData) {
      await updateOnboardingStep(currentStep + 1, stepData);
    }
    
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const stepProps = {
      onNext: handleNext,
      onBack: handleBack,
      profile: jobSeekerProfile,
      isFirst: currentStep === 1,
      isLast: currentStep === TOTAL_STEPS
    };

    switch (currentStep) {
      case 1:
        return <OnboardingStep1 {...stepProps} />;
      case 2:
        return <OnboardingStep2 {...stepProps} />;
      case 3:
        return <OnboardingStep3 {...stepProps} />;
      case 4:
        return <OnboardingStep4 {...stepProps} />;
      case 5:
        return <OnboardingStep5 {...stepProps} />;
      case 6:
        return <OnboardingStep6 {...stepProps} />;
      case 7:
        return <OnboardingStep7 {...stepProps} />;
      default:
        return <OnboardingStep1 {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Welcome to Hirewise",
      "Basic Information",
      "Job Preferences", 
      "Company & Culture",
      "Skills & Experience",
      "Personality Assessment",
      "Final Preferences"
    ];
    return titles[currentStep - 1];
  };

  const getStepDescription = () => {
    const descriptions = [
      "Let's get you set up for success",
      "Tell us about your background",
      "What kind of role are you looking for?",
      "What work environment suits you best?",
      "Share your skills and expertise",
      "Help us understand your work style",
      "Set your matching preferences"
    ];
    return descriptions[currentStep - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {getStepDescription()}
            </CardDescription>
            <div className="mt-4">
              <Progress 
                value={(currentStep / TOTAL_STEPS) * 100} 
                className="w-full h-2"
              />
              <p className="text-sm text-gray-500 mt-2">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
