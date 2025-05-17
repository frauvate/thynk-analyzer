/*
  # Fix Companies Table RLS Policies

  1. Changes
    - Remove existing RLS policies for companies table that may conflict
    - Add comprehensive RLS policies for companies table:
      - Allow employers to create their own company
      - Allow employers to update their own company
      - Allow everyone to view companies
      
  2. Security
    - Ensures employers can only create/update their own company
    - Maintains public visibility of companies
    - Validates user is an employer before allowing company creation
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Employers can create their company" ON companies;
DROP POLICY IF EXISTS "Employers can insert their own company" ON companies;
DROP POLICY IF EXISTS "Employers can update their own company" ON companies;

-- Create new comprehensive policies
CREATE POLICY "Companies are viewable by everyone"
ON companies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Employers can create company"
ON companies FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);

CREATE POLICY "Employers can update own company"
ON companies FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);