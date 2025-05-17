/*
  # Fix Companies Table RLS Policies

  1. Changes
    - Remove duplicate and incorrect policies for company creation
    - Create a single, correct policy for company creation
    - Ensure policies use 'authenticated' role instead of 'public'
    
  2. Security
    - Maintains existing RLS policies for viewing and updating
    - Fixes company creation policy to properly check user type
    - Ensures proper authentication checks
*/

-- First, drop the conflicting policies
DROP POLICY IF EXISTS "Employers can create company" ON companies;
DROP POLICY IF EXISTS "Employers can create companies" ON companies;
DROP POLICY IF EXISTS "Employers can create company profiles" ON companies;

-- Create a single, correct policy for company creation
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.uid() = user_id) AND 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
);