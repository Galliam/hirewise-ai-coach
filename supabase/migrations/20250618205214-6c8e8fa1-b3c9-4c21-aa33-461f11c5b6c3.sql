
-- Create function to update updated_at timestamps (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create table for job seeker profiles with detailed onboarding data
CREATE TABLE public.job_seeker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  
  -- Resume and basic info
  resume_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  
  -- Job preferences
  desired_job_title TEXT,
  desired_location TEXT[],
  job_type TEXT[], -- 'full_time', 'part_time', 'contract', 'remote', 'hybrid'
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Company preferences
  company_types TEXT[], -- 'startup', 'mid_size', 'enterprise', 'non_profit', 'government'
  company_sizes TEXT[], -- '1-10', '11-50', '51-200', '201-1000', '1000+'
  industries TEXT[], -- 'tech', 'finance', 'healthcare', 'education', etc.
  
  -- Work environment preferences
  work_environment TEXT[], -- 'fast_paced', 'collaborative', 'independent', 'structured', 'flexible'
  company_culture TEXT[], -- 'innovative', 'traditional', 'casual', 'formal', 'diverse'
  benefits_priorities TEXT[], -- 'health_insurance', 'retirement', 'pto', 'remote_work', 'learning_budget'
  
  -- Job seeker status
  job_seeker_status TEXT DEFAULT 'active', -- 'active', 'passive', 'not_looking'
  availability TEXT, -- 'immediate', '2_weeks', '1_month', '3_months'
  current_company TEXT,
  current_title TEXT,
  years_experience INTEGER,
  
  -- Skills and expertise
  technical_skills TEXT[],
  soft_skills TEXT[],
  languages TEXT[], -- 'english', 'spanish', 'french', etc.
  certifications TEXT[],
  
  -- Onboarding completion status
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 1, -- track which step they're on
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for personality assessment results
CREATE TABLE public.personality_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_seeker_id UUID REFERENCES public.job_seeker_profiles(id) ON DELETE CASCADE,
  
  -- Personality traits (Big 5 or similar)
  openness_score INTEGER CHECK (openness_score >= 1 AND openness_score <= 10),
  conscientiousness_score INTEGER CHECK (conscientiousness_score >= 1 AND conscientiousness_score <= 10),
  extraversion_score INTEGER CHECK (extraversion_score >= 1 AND extraversion_score <= 10),
  agreeableness_score INTEGER CHECK (agreeableness_score >= 1 AND agreeableness_score <= 10),
  neuroticism_score INTEGER CHECK (neuroticism_score >= 1 AND neuroticism_score <= 10),
  
  -- Work style preferences
  work_style_traits TEXT[], -- 'analytical', 'creative', 'detail_oriented', 'big_picture', 'independent', 'collaborative'
  communication_style TEXT, -- 'direct', 'diplomatic', 'casual', 'formal'
  leadership_preference TEXT, -- 'lead', 'follow', 'collaborate', 'individual_contributor'
  
  -- Assessment responses (store raw responses for analysis)
  assessment_responses JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for potential/skills assessment results
CREATE TABLE public.skills_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_seeker_id UUID REFERENCES public.job_seeker_profiles(id) ON DELETE CASCADE,
  
  -- Core competencies
  problem_solving_score INTEGER CHECK (problem_solving_score >= 1 AND problem_solving_score <= 10),
  communication_score INTEGER CHECK (communication_score >= 1 AND communication_score <= 10),
  leadership_score INTEGER CHECK (leadership_score >= 1 AND leadership_score <= 10),
  technical_aptitude_score INTEGER CHECK (technical_aptitude_score >= 1 AND technical_aptitude_score <= 10),
  creativity_score INTEGER CHECK (creativity_score >= 1 AND creativity_score <= 10),
  adaptability_score INTEGER CHECK (adaptability_score >= 1 AND adaptability_score <= 10),
  
  -- Strengths and development areas
  top_strengths TEXT[],
  development_areas TEXT[],
  
  -- Learning preferences
  learning_style TEXT[], -- 'visual', 'auditory', 'kinesthetic', 'reading'
  growth_mindset_score INTEGER CHECK (growth_mindset_score >= 1 AND growth_mindset_score <= 10),
  
  -- Assessment responses
  assessment_responses JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for job matching preferences and weights
CREATE TABLE public.job_matching_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_seeker_id UUID REFERENCES public.job_seeker_profiles(id) ON DELETE CASCADE,
  
  -- Matching criteria weights (1-10 scale)
  salary_weight INTEGER DEFAULT 7 CHECK (salary_weight >= 1 AND salary_weight <= 10),
  location_weight INTEGER DEFAULT 8 CHECK (location_weight >= 1 AND location_weight <= 10),
  company_culture_weight INTEGER DEFAULT 6 CHECK (company_culture_weight >= 1 AND company_culture_weight <= 10),
  growth_opportunities_weight INTEGER DEFAULT 7 CHECK (growth_opportunities_weight >= 1 AND growth_opportunities_weight <= 10),
  work_life_balance_weight INTEGER DEFAULT 8 CHECK (work_life_balance_weight >= 1 AND work_life_balance_weight <= 10),
  role_responsibilities_weight INTEGER DEFAULT 9 CHECK (role_responsibilities_weight >= 1 AND role_responsibilities_weight <= 10),
  
  -- Deal breakers
  deal_breakers TEXT[], -- 'no_remote', 'salary_below_x', 'long_commute', 'certain_industries'
  
  -- Preferred contact methods and timing
  contact_preferences TEXT[], -- 'email', 'phone', 'linkedin', 'text'
  best_contact_time TEXT, -- 'morning', 'afternoon', 'evening'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE public.job_seeker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matching_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_seeker_profiles
CREATE POLICY "Users can manage their own job seeker profile" 
  ON public.job_seeker_profiles 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = job_seeker_profiles.user_id 
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view job seeker profiles for matching" 
  ON public.job_seeker_profiles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.user_type = 'recruiter'
    )
    AND onboarding_completed = true
  );

-- RLS Policies for personality_assessments
CREATE POLICY "Users can manage their own personality assessment" 
  ON public.personality_assessments 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.job_seeker_profiles jsp 
      JOIN public.profiles p ON jsp.user_id = p.id 
      WHERE jsp.id = personality_assessments.job_seeker_id 
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view personality assessments for matching" 
  ON public.personality_assessments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.user_type = 'recruiter'
    )
  );

-- RLS Policies for skills_assessments
CREATE POLICY "Users can manage their own skills assessment" 
  ON public.skills_assessments 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.job_seeker_profiles jsp 
      JOIN public.profiles p ON jsp.user_id = p.id 
      WHERE jsp.id = skills_assessments.job_seeker_id 
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view skills assessments for matching" 
  ON public.skills_assessments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.user_type = 'recruiter'
    )
  );

-- RLS Policies for job_matching_preferences
CREATE POLICY "Users can manage their own matching preferences" 
  ON public.job_matching_preferences 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.job_seeker_profiles jsp 
      JOIN public.profiles p ON jsp.user_id = p.id 
      WHERE jsp.id = job_matching_preferences.job_seeker_id 
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view matching preferences for job matching" 
  ON public.job_matching_preferences 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.user_type = 'recruiter'
    )
  );

-- Create function to auto-create job seeker profile when user signs up as job seeker
CREATE OR REPLACE FUNCTION public.create_job_seeker_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_type = 'job_seeker' THEN
    INSERT INTO public.job_seeker_profiles (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create job seeker profile
CREATE TRIGGER on_job_seeker_profile_creation
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_job_seeker_profile();

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_job_seeker_profiles_updated_at
  BEFORE UPDATE ON public.job_seeker_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_personality_assessments_updated_at
  BEFORE UPDATE ON public.personality_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_skills_assessments_updated_at
  BEFORE UPDATE ON public.skills_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_job_matching_preferences_updated_at
  BEFORE UPDATE ON public.job_matching_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
