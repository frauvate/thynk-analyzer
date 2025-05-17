/*
  # Fix Jobs Table RLS Policies

  1. Changes
    - Drop existing RLS policies for jobs table
    - Create new policies that allow:
      * Employers to create jobs
      * Job owners to update/delete their jobs
      * Everyone to view active jobs
    
  2. Security
    - Maintain basic security while allowing employers to post jobs
    - Use auth.uid() instead of uid() function
    - Ensure proper user type checking
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