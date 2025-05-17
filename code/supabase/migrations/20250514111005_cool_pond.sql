/*
  # Fix jobs table foreign key and RLS policies

  1. Changes
    - Update foreign key to reference profiles table
    - Fix RLS policies to use correct auth.uid() function
    - Add comprehensive policies for all operations

  2. Security
    - Enable RLS
    - Add policies for job creation, updates, and viewing
    - Ensure proper user type verification
*/

-- Drop existing foreign key constraint
ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_user_id_fkey;

-- Add new foreign key constraint referencing profiles
ALTER TABLE jobs
ADD CONSTRAINT jobs_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "employers_can_create_jobs" ON jobs;
DROP POLICY IF EXISTS "jobs_select_policy" ON jobs;
DROP POLICY IF EXISTS "jobs_update_policy" ON jobs;

-- Create new policies
CREATE POLICY "employers_can_create_jobs"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'employer'
  )
);

CREATE POLICY "employers_can_update_own_jobs"
ON jobs FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'employer'
  )
);

CREATE POLICY "employers_can_delete_own_jobs"
ON jobs FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "authenticated_users_can_view_jobs"
ON jobs FOR SELECT
TO authenticated
USING (true);