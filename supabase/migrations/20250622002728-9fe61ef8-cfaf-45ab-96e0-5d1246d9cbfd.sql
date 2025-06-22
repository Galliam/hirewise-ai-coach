
-- Create recruiter_interests table to track when recruiters express interest in candidates
CREATE TABLE public.recruiter_interests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  candidate_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  message text, -- Optional message from recruiter
  UNIQUE(recruiter_id, candidate_id) -- Prevent duplicate interests
);

-- Create career_updates table to track candidate career movements
CREATE TABLE public.career_updates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  update_type text NOT NULL, -- 'job_change', 'promotion', 'skill_added', 'certification'
  title text NOT NULL,
  description text,
  company text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.recruiter_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_updates ENABLE ROW LEVEL SECURITY;

-- RLS policies for recruiter_interests
CREATE POLICY "Recruiters can view their own interests"
  ON public.recruiter_interests
  FOR SELECT
  USING (recruiter_id = auth.uid());

CREATE POLICY "Candidates can view interests in them"
  ON public.recruiter_interests
  FOR SELECT
  USING (candidate_id = auth.uid());

CREATE POLICY "Recruiters can create interests"
  ON public.recruiter_interests
  FOR INSERT
  WITH CHECK (recruiter_id = auth.uid());

CREATE POLICY "Candidates can update interest status"
  ON public.recruiter_interests
  FOR UPDATE
  USING (candidate_id = auth.uid());

-- RLS policies for career_updates
CREATE POLICY "Candidates can manage their career updates"
  ON public.career_updates
  FOR ALL
  USING (candidate_id = auth.uid());

CREATE POLICY "Recruiters can view career updates of accepted interests"
  ON public.career_updates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.recruiter_interests 
      WHERE recruiter_id = auth.uid() 
      AND candidate_id = career_updates.candidate_id 
      AND status = 'accepted'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_recruiter_interests_updated_at
  BEFORE UPDATE ON public.recruiter_interests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create function to calculate interest score for profile scoring
CREATE OR REPLACE FUNCTION public.calculate_interest_score(candidate_profile_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (SELECT COUNT(*)::integer * 5 FROM public.recruiter_interests 
     WHERE candidate_id = candidate_profile_id AND status = 'accepted'), 
    0
  ) + COALESCE(
    (SELECT COUNT(*)::integer * 2 FROM public.recruiter_interests 
     WHERE candidate_id = candidate_profile_id AND status = 'pending'), 
    0
  );
$$;
