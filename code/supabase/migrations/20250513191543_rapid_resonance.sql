/*
  # Fix Jobs Table RLS Policies

  1. Changes
    - Drop existing INSERT policy and create a new one with correct checks
    - Ensure proper RLS policy for employers creating jobs
    - Maintain existing SELECT and UPDATE policies
    
  2. Security
    - Employers can only create jobs if they have the correct user_type
    - Maintains existing security for viewing and updating jobs
*/

-- First ensure RLS is enabled
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;

-- Create new INSERT policy with proper checks
CREATE POLICY "Employers can create jobs" ON jobs
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
  AND auth.uid() = user_id
);