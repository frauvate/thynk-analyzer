/*
  # Fix Companies Table RLS Policies

  1. Changes
    - Drop existing INSERT policy that's not working correctly
    - Create new INSERT policy with proper checks for employer user type
    - Ensure proper RLS is enabled

  2. Security
    - Only employers can create companies
    - Companies can only be created by authenticated users
    - Each company must be associated with the user creating it
*/

-- First ensure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Drop the existing INSERT policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Employers can create company" ON companies;
END $$;

-- Create new INSERT policy with proper checks
CREATE POLICY "Employers can create company"
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