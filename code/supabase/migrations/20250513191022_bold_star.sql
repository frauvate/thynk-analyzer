/*
  # Fix Jobs RLS Policy

  1. Changes
    - Drop existing INSERT policy for jobs table
    - Create new INSERT policy with correct user verification
    
  2. Security
    - Ensures employers can create jobs while maintaining security
    - Verifies user is authenticated and has employer role
    - Links job to correct user ID
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;

-- Create new INSERT policy with correct implementation
CREATE POLICY "Employers can create jobs"
ON jobs
FOR INSERT
TO authenticated
WITH CHECK (
  -- Verify the user is an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
  -- Ensure the job is being created with the correct user_id
  AND auth.uid() = user_id
);