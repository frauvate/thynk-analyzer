/*
  # Update jobs table type and policies

  1. Changes
    - Drop and recreate jobs table with proper type constraints
    - Add RLS policies for job management
    
  2. Security
    - Enable RLS on jobs table
    - Add policies for employers to manage jobs
    - Allow authenticated users to view jobs
*/

-- Drop existing table and type
DROP TABLE IF EXISTS jobs CASCADE;
DROP TYPE IF EXISTS job_type_enum CASCADE;

-- Create job type enum
CREATE TYPE job_type_enum AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- Create jobs table with proper type
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  type job_type_enum NOT NULL,
  salary_min integer,
  salary_max integer,
  requirements text[] NOT NULL DEFAULT '{}',
  benefits text[] NOT NULL DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  
  CONSTRAINT valid_salary CHECK (salary_min <= salary_max)
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create indexes for better performance
CREATE INDEX jobs_user_id_idx ON jobs(user_id);
CREATE INDEX jobs_is_active_idx ON jobs(is_active);
CREATE INDEX jobs_created_at_idx ON jobs(created_at);
CREATE INDEX jobs_expires_at_idx ON jobs(expires_at);

-- Create trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();