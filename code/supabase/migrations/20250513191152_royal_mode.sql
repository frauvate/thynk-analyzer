/*
  # Fix jobs table foreign key and RLS policies

  1. Changes
    - Drop existing foreign key that references users table
    - Add new foreign key that references profiles table
    - Update RLS policies to properly check employer status
  
  2. Security
    - Maintain RLS enabled on jobs table
    - Update policies to properly check user type from profiles table
*/

-- First drop the existing foreign key
ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_user_id_fkey;

-- Add the correct foreign key to profiles
ALTER TABLE jobs
ADD CONSTRAINT jobs_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Everyone can view active jobs" ON jobs;

-- Recreate policies with correct references
CREATE POLICY "Employers can create jobs"
ON jobs
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "Employers can update their own jobs"
ON jobs
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
)
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "Everyone can view active jobs"
ON jobs
FOR SELECT
TO authenticated
USING (
  is_active = true OR user_id = auth.uid()
);