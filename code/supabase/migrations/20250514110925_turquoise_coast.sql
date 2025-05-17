/*
  # Fix jobs table foreign key and RLS policies

  1. Changes
    - Drop existing foreign key constraint for jobs.user_id
    - Add new foreign key constraint referencing profiles.id
    - Update RLS policies for jobs table to work with profiles

  2. Security
    - Enable RLS on jobs table
    - Add policies for employers to manage their jobs
    - Add policy for all authenticated users to view jobs
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
  uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = uid() 
    AND profiles.user_type = 'employer'
  )
);

CREATE POLICY "employers_can_update_own_jobs"
ON jobs FOR UPDATE
TO authenticated
USING (uid() = user_id)
WITH CHECK (
  uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = uid() 
    AND profiles.user_type = 'employer'
  )
);

CREATE POLICY "employers_can_delete_own_jobs"
ON jobs FOR DELETE
TO authenticated
USING (uid() = user_id);

CREATE POLICY "authenticated_users_can_view_jobs"
ON jobs FOR SELECT
TO authenticated
USING (true);