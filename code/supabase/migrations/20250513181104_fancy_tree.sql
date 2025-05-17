/*
  # Fix jobs table schema

  1. Changes
    - Drop existing jobs table if it exists
    - Create new jobs table with correct schema
    - Add RLS policies
    - Add necessary indexes

  2. Security
    - Enable RLS
    - Add policies for employers to manage their jobs
    - Add policy for authenticated users to view jobs
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS jobs CASCADE;

-- Create jobs table with correct schema
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('full_time', 'part_time', 'contract', 'internship')),
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

-- Policies for jobs table
CREATE POLICY "Employers can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM companies
    WHERE id = company_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Employers can update their own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE id = company_id
    AND user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM companies
    WHERE id = company_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Everyone can view active jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (
    is_active = true OR 
    EXISTS (
      SELECT 1 FROM companies
      WHERE id = company_id
      AND user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX jobs_company_id_idx ON jobs(company_id);
CREATE INDEX jobs_is_active_idx ON jobs(is_active);
CREATE INDEX jobs_created_at_idx ON jobs(created_at);
CREATE INDEX jobs_expires_at_idx ON jobs(expires_at);

-- Create trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();