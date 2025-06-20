
-- Add missing columns to applications table for better tracking
ALTER TABLE applications ADD COLUMN IF NOT EXISTS application_insights JSONB;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create messages table for recruiter-candidate communication
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  recipient_id UUID REFERENCES auth.users(id) NOT NULL,
  application_id UUID REFERENCES applications(id),
  message_text TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (sender_id = auth.uid());

-- Create conversations view for easier querying (fixed UUID concatenation)
CREATE OR REPLACE VIEW conversation_summaries AS
SELECT DISTINCT ON (
  CASE 
    WHEN sender_id::text < recipient_id::text THEN sender_id::text || recipient_id::text
    ELSE recipient_id::text || sender_id::text
  END
)
  CASE 
    WHEN sender_id::text < recipient_id::text THEN sender_id::text || recipient_id::text
    ELSE recipient_id::text || sender_id::text
  END as conversation_id,
  sender_id,
  recipient_id,
  application_id,
  message_text as last_message,
  created_at as last_message_at,
  read_at,
  (SELECT COUNT(*) FROM messages m2 
   WHERE (m2.sender_id = messages.sender_id AND m2.recipient_id = messages.recipient_id)
      OR (m2.sender_id = messages.recipient_id AND m2.recipient_id = messages.sender_id)
   AND m2.read_at IS NULL 
   AND m2.recipient_id = auth.uid()) as unread_count
FROM messages
ORDER BY conversation_id, created_at DESC;

-- Update applications table RLS policies
DROP POLICY IF EXISTS "Recruiters can view applications for their jobs" ON applications;
DROP POLICY IF EXISTS "Job seekers can view their own applications" ON applications;
DROP POLICY IF EXISTS "Recruiters can update applications for their jobs" ON applications;

CREATE POLICY "Recruiters can view applications for their jobs" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Job seekers can view their own applications" ON applications
  FOR SELECT USING (applicant_id = auth.uid());

CREATE POLICY "Job seekers can create applications" ON applications
  FOR INSERT WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Recruiters can update applications for their jobs" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );

-- Add trigger to update applications updated_at
CREATE OR REPLACE FUNCTION update_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS applications_updated_at_trigger ON applications;
CREATE TRIGGER applications_updated_at_trigger
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_applications_updated_at();
