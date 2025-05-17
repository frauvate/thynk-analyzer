/*
  # Fix Jobs RLS Policies

  1. Changes
    - Drop existing RLS policies for jobs table
    - Create new, more permissive policies for job management
    - Ensure employers can create and manage their jobs
    - Allow all authenticated users to view jobs

  2. Security
    - Maintain RLS enabled on jobs table
    - Add comprehensive policies for CRUD operations
    - Ensure proper user type checking for employers
*/

-- Drop existing policies
DROP POLICY IF EXISTS "authenticated_users_can_view_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_create_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_delete_own_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_update_own_jobs" ON jobs;

-- Create new policies
CREATE POLICY "Anyone can view active jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (
    CASE 
      WHEN is_active = true AND (expires_at IS NULL OR expires_at > now()) 
      THEN true
      ELSE uid() = user_id
    END
  );

CREATE POLICY "Employers can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = uid()
      AND profiles.user_type = 'employer'
    )
  );

CREATE POLICY "Employers can update own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (
    uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = uid()
      AND profiles.user_type = 'employer'
    )
  )
  WITH CHECK (
    uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = uid()
      AND profiles.user_type = 'employer'
    )
  );

CREATE POLICY "Employers can delete own jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (
    uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = uid()
      AND profiles.user_type = 'employer'
    )
  );