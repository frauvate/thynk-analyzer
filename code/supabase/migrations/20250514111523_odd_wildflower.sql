/*
  # Fix jobs table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper auth.uid() function calls
    - Add policies for viewing, creating, updating, and deleting jobs
    
  2. Security
    - Only employers can create/update/delete jobs
    - All authenticated users can view active jobs
    - Job owners can see their inactive jobs
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
      ELSE auth.uid() = user_id
    END
  );

CREATE POLICY "Employers can create jobs"
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

CREATE POLICY "Employers can update own jobs"
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

CREATE POLICY "Employers can delete own jobs"
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