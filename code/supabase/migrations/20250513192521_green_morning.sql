/*
  # Fix jobs table RLS policies

  1. Changes
    - Update RLS policies for jobs table to allow employers to create jobs
    - Add proper user_id check for job creation
    - Ensure proper authentication checks

  2. Security
    - Enable RLS on jobs table
    - Add policy for job creation by employers
    - Add policy for job updates by owners
    - Add policy for job viewing
*/

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Everyone can view active jobs" ON jobs;

-- Create new policies
CREATE POLICY "Employers can create jobs"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
  AND auth.uid() = user_id
);

CREATE POLICY "Employers can update their own jobs"
ON jobs FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
)
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
);

CREATE POLICY "Everyone can view active jobs"
ON jobs FOR SELECT
TO authenticated
USING (
  is_active = true
  OR auth.uid() = user_id
);