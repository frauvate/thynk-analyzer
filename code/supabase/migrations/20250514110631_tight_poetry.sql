/*
  # Fix jobs table RLS policies

  1. Changes
    - Drop all existing RLS policies for jobs table
    - Create new RLS policies with unique names
    - Ensure proper employer checks for job creation
    
  2. Security
    - Enable RLS on jobs table
    - Add policies for:
      - Job creation (employers only)
      - Job updates (owners only)
      - Job viewing (all authenticated users)
*/

-- First ensure RLS is enabled
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop ALL possible existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow job creation for employers" ON jobs;
DROP POLICY IF EXISTS "Allow job updates for owners" ON jobs;
DROP POLICY IF EXISTS "Allow job viewing for authenticated users" ON jobs;
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Everyone can view active jobs" ON jobs;
DROP POLICY IF EXISTS "Users can create jobs" ON jobs;
DROP POLICY IF EXISTS "Users can update jobs" ON jobs;
DROP POLICY IF EXISTS "Users can view jobs" ON jobs;

-- Create new policies with unique names
CREATE POLICY "jobs_insert_policy"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "jobs_update_policy"
ON jobs FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "jobs_select_policy"
ON jobs FOR SELECT
TO authenticated
USING (true);