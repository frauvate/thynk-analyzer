/*
  # Update Jobs Table RLS Policies

  1. Changes
    - Drop existing jobs_insert_policy
    - Create new INSERT policy for employers
    - Add additional check for employer user type
    
  2. Security
    - Ensures only employers can create jobs
    - Validates user_id matches authenticated user
    - Maintains existing SELECT and UPDATE policies
*/

-- Drop the existing insert policy
DROP POLICY IF EXISTS "jobs_insert_policy" ON jobs;

-- Create new insert policy with proper checks
CREATE POLICY "employers_can_create_jobs"
ON jobs
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure user_id matches the authenticated user
  auth.uid() = user_id
  AND
  -- Verify the user is an employer by checking profiles table
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

-- Ensure RLS is enabled
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;