-- PHASE 1: CRITICAL RLS FIXES

-- 1. Enable RLS on jobs table and create proper policies
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
CREATE POLICY "Recruiters can manage their own jobs" ON public.jobs
  FOR ALL USING (recruiter_id = auth.uid());

CREATE POLICY "Job seekers can view published jobs" ON public.jobs
  FOR SELECT USING (status = 'published');

-- 2. Ensure RLS is enabled on applications table (should already have policies)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 3. Fix conversation_summaries view - recreate without SECURITY DEFINER
DROP VIEW IF EXISTS public.conversation_summaries;

CREATE VIEW public.conversation_summaries AS
SELECT DISTINCT ON (
  CASE 
    WHEN sender_id < recipient_id THEN sender_id || recipient_id
    ELSE recipient_id || sender_id
  END
)
  CASE 
    WHEN sender_id < recipient_id THEN sender_id || recipient_id
    ELSE recipient_id || sender_id
  END as conversation_id,
  sender_id,
  recipient_id,
  application_id,
  message_text as last_message,
  created_at as last_message_at,
  read_at,
  (SELECT COUNT(*) FROM messages m2 
   WHERE ((m2.sender_id = messages.sender_id AND m2.recipient_id = messages.recipient_id)
      OR (m2.sender_id = messages.recipient_id AND m2.recipient_id = messages.sender_id))
   AND m2.read_at IS NULL 
   AND m2.recipient_id = auth.uid()) as unread_count
FROM messages
WHERE sender_id = auth.uid() OR recipient_id = auth.uid()
ORDER BY 
  CASE 
    WHEN sender_id < recipient_id THEN sender_id || recipient_id
    ELSE recipient_id || sender_id
  END, 
  created_at DESC;