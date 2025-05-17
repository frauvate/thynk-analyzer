/*
  # Fix Jobs Table RLS Policies

  1. Changes
    - Drop existing RLS policies for jobs table
    - Create new, more robust RLS policies with proper checks
    
  2. Security
    - Ensures employers can only create jobs when:
      a) They are authenticated
      b) They have a profile with user_type = 'employer'
      c) The job's user_id matches their auth.uid()
    - Maintains existing read access for all authenticated users
    - Ensures employers can only update/delete their own jobs
*/

-- Drop existing policies
DROP POLICY IF EXISTS "authenticated_users_can_view_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_create_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_delete_own_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_update_own_jobs" ON jobs;

-- Recreate policies with proper checks
CREATE POLICY "authenticated_users_can_view_jobs"
ON jobs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "employers_can_create_jobs"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (
  -- Check that the user is creating a job for themselves
  auth.uid() = user_id 
  AND
  -- Verify the user is an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "employers_can_update_own_jobs"
ON jobs FOR UPDATE
TO authenticated
USING (
  -- Can only update their own jobs
  auth.uid() = user_id
  AND
  -- Must be an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
)
WITH CHECK (
  -- Same conditions for the new row
  auth.uid() = user_id
  AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "employers_can_delete_own_jobs"
ON jobs FOR DELETE
TO authenticated
USING (
  -- Can only delete their own jobs
  auth.uid() = user_id
  AND
  -- Must be an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);