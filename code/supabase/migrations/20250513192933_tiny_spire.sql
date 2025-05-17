/*
  # Debug and fix jobs RLS policies

  1. Changes
    - Add more specific RLS policies for job creation
    - Add debugging function to help identify RLS failures
    
  2. Security
    - Maintains existing security model where only employers can create jobs
    - Adds more detailed error messages for debugging
*/

-- First create a function to help with debugging RLS failures
CREATE OR REPLACE FUNCTION check_job_creation_permission()
RETURNS trigger AS $$
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'User is not authenticated';
  END IF;

  -- Check if user exists in profiles and is an employer
  IF NOT EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND user_type = 'employer'
  ) THEN
    RAISE EXCEPTION 'User is not registered as an employer';
  END IF;

  -- Check if user_id matches authenticated user
  IF NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'user_id must match authenticated user';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to run the check before insert
DROP TRIGGER IF EXISTS check_job_creation ON jobs;
CREATE TRIGGER check_job_creation
  BEFORE INSERT ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_job_creation_permission();

-- Drop and recreate the insert policy with clearer conditions
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
CREATE POLICY "Employers can create jobs"
ON jobs
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND user_type = 'employer'
  )
);