/*
  # Fix jobs table RLS policies and type handling

  1. Changes
    - Drop existing RLS policies
    - Create new simplified RLS policies
    - Fix job type enum
    - Add proper user type checking
    
  2. Security
    - Enable RLS
    - Add policies for job management
    - Ensure proper user type validation
*/

-- Drop existing type enum if exists
DROP TYPE IF EXISTS job_type_enum CASCADE;

-- Create job type enum
CREATE TYPE job_type_enum AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- Modify jobs table to use enum
ALTER TABLE jobs 
  ALTER COLUMN type TYPE job_type_enum USING type::job_type_enum;

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Everyone can view active jobs" ON jobs;

-- Create simplified policies
CREATE POLICY "Allow job creation for employers"
ON jobs FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "Allow job updates for owners"
ON jobs FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow job viewing for authenticated users"
ON jobs FOR SELECT 
TO authenticated
USING (true);