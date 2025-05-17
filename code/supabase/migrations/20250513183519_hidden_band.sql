/*
  # Fix Company RLS Policies

  1. Changes
    - Drop all existing company-related policies to avoid conflicts
    - Re-create policies with proper checks
    - Ensure RLS is enabled

  2. Security
    - Enable RLS on companies table
    - Add policies for:
      - Company creation (employers only)
      - Company viewing (all authenticated users)
      - Company updates (company owners only)
*/

-- First, ensure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Employers can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Employers can update own company" ON companies;
DROP POLICY IF EXISTS "Employers can create company" ON companies;
DROP POLICY IF EXISTS "Employers can create company profiles" ON companies;

-- Create consolidated policies
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure user_id matches authenticated user
  auth.uid() = user_id
  AND
  -- Verify user is an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "Companies are viewable by everyone"
ON companies
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Employers can update own company"
ON companies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);