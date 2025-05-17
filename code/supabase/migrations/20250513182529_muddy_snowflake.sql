/*
  # Add company profile fields

  1. Changes
    - Add industry and size columns to companies table
    - Make description nullable for flexibility
    - Update RLS policies to reflect changes

  2. Security
    - Maintain existing RLS policies
*/

-- Modify companies table
ALTER TABLE companies 
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS size text,
  ALTER COLUMN description DROP NOT NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Employers can create their company" ON companies;
DROP POLICY IF EXISTS "Employers can update their own company" ON companies;

-- Recreate policies
CREATE POLICY "Companies are viewable by everyone"
  ON companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employers can create their company"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employers can update their own company"
  ON companies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for industry search
CREATE INDEX IF NOT EXISTS companies_industry_idx ON companies(industry);