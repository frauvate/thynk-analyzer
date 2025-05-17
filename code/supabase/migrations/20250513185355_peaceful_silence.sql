/*
  # Update companies table RLS policies

  1. Security
    - Drop existing policies if they exist
    - Recreate policies for companies table:
      - Allow employers to create companies
      - Allow company owners to update their companies
      - Allow all authenticated users to view companies
      - Allow company owners to delete their companies
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop create policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' 
    AND policyname = 'Employers can create companies'
  ) THEN
    DROP POLICY "Employers can create companies" ON companies;
  END IF;

  -- Drop update policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' 
    AND policyname = 'Company owners can update their companies'
  ) THEN
    DROP POLICY "Company owners can update their companies" ON companies;
  END IF;

  -- Drop select policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' 
    AND policyname = 'Companies are viewable by all authenticated users'
  ) THEN
    DROP POLICY "Companies are viewable by all authenticated users" ON companies;
  END IF;

  -- Drop delete policy
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' 
    AND policyname = 'Company owners can delete their companies'
  ) THEN
    DROP POLICY "Company owners can delete their companies" ON companies;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
  AND auth.uid() = user_id
);

CREATE POLICY "Company owners can update their companies"
ON companies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Companies are viewable by all authenticated users"
ON companies
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Company owners can delete their companies"
ON companies
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);