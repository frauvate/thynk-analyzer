/*
  # Fix jobs table RLS policies

  1. Changes
    - Drop existing policies
    - Create new policies for:
      - Viewing jobs (all authenticated users)
      - Creating jobs (employers only)
      - Updating jobs (job owners only)
      - Deleting jobs (job owners only)
    
  2. Security
    - Enable RLS
    - Ensure proper user type checking
    - Maintain data integrity
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can delete own jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update own jobs" ON jobs;
DROP POLICY IF EXISTS "authenticated_users_can_view_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_create_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_delete_own_jobs" ON jobs;
DROP POLICY IF EXISTS "employers_can_update_own_jobs" ON jobs;

-- Create new policies
CREATE POLICY "jobs_view_policy"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (
    CASE 
      WHEN is_active = true AND (expires_at IS NULL OR expires_at > now()) 
      THEN true
      ELSE auth.uid() = user_id
    END
  );

CREATE POLICY "jobs_insert_policy"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'employer'
    )
  );

CREATE POLICY "jobs_update_policy"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'employer'
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'employer'
    )
  );

CREATE POLICY "jobs_delete_policy"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'employer'
    )
  );