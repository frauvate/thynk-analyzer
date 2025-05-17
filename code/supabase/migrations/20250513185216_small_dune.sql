/*
  # Update companies table RLS policies

  1. Changes
    - Drop existing RLS policies for companies table
    - Create new comprehensive RLS policies that properly handle all operations
    
  2. Security
    - Enable RLS on companies table
    - Add policies for:
      - SELECT: All authenticated users can view companies
      - INSERT: Only employers can create companies
      - UPDATE: Company owners can update their companies
      - DELETE: Company owners can delete their companies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON companies;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON companies;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON companies;

-- Create new policies
CREATE POLICY "Companies are viewable by all authenticated users"
ON companies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Employers can create companies"
ON companies FOR INSERT
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
ON companies FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Company owners can delete their companies"
ON companies FOR DELETE
TO authenticated
USING (auth.uid() = user_id);