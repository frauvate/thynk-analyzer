/*
  # Fix Company RLS Policies

  1. Changes
    - Drop existing RLS policies to avoid conflicts
    - Create new policies with proper user type checking
    - Ensure RLS is enabled on companies table

  2. Security
    - Enable RLS on companies table
    - Add policies for:
      * Company creation (employers only)
      * Company viewing (all authenticated users)
      * Company updates (company owners only)
*/

-- First, drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Employers can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Employers can update own company" ON companies;

-- Make sure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Policy for creating companies (employers only)
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
);

-- Policy for viewing companies (all authenticated users)
CREATE POLICY "Companies are viewable by everyone"
ON companies
FOR SELECT
TO authenticated
USING (true);

-- Policy for updating companies (owners only)
CREATE POLICY "Employers can update own company"
ON companies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);