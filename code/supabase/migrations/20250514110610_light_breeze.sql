/*
  # Fix jobs table RLS policies

  1. Changes
    - Drop existing RLS policies for jobs table
    - Create new comprehensive RLS policies that properly handle all operations
    
  2. Security
    - Enable RLS on jobs table
    - Add policies for:
      - INSERT: Only employers can create jobs
      - UPDATE: Job owners can update their jobs
      - SELECT: All authenticated users can view jobs
*/

-- First ensure RLS is enabled
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Everyone can view active jobs" ON jobs;

-- Create new policies
CREATE POLICY "Allow job creation for employers"
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

CREATE POLICY "Allow job updates for owners"
ON jobs FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow job viewing for authenticated users"
ON jobs FOR SELECT
TO authenticated
USING (true);