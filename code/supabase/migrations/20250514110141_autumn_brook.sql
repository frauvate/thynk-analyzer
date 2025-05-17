/*
  # Fix jobs table type enum and policies

  1. Changes
    - Create job_type_enum type
    - Update jobs table to use the new enum type
    - Simplify RLS policies
    
  2. Security
    - Maintain RLS on jobs table
    - Update policies for proper employer checks
*/

-- Drop existing type enum if exists
DROP TYPE IF EXISTS job_type_enum CASCADE;

-- Create job type enum
CREATE TYPE job_type_enum AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- Modify jobs table to use enum (with proper type casting)
ALTER TABLE jobs 
  ALTER COLUMN type TYPE job_type_enum 
  USING (
    CASE type
      WHEN 'full_time' THEN 'full_time'::job_type_enum
      WHEN 'part_time' THEN 'part_time'::job_type_enum
      WHEN 'contract' THEN 'contract'::job_type_enum
      WHEN 'internship' THEN 'internship'::job_type_enum
      ELSE 'full_time'::job_type_enum
    END
  );

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