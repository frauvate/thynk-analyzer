/*
  # Fix Companies Table RLS Policies

  1. Changes
    - Drop all existing RLS policies for companies table
    - Create simplified RLS policies that allow:
      - Any authenticated user to create a company
      - All authenticated users to view companies
      - Company owners to update their own companies
      - Company owners to delete their own companies

  2. Security
    - Maintains basic security while allowing company creation
    - Ensures company owners can manage their own companies
    - Keeps companies viewable by all authenticated users
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Employers can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by all authenticated users" ON companies;
DROP POLICY IF EXISTS "Company owners can update their companies" ON companies;
DROP POLICY IF EXISTS "Company owners can delete their companies" ON companies;
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON companies;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON companies;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON companies;
DROP POLICY IF EXISTS "Anyone can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Users can update own company" ON companies;
DROP POLICY IF EXISTS "Employers can create company" ON companies;
DROP POLICY IF EXISTS "Employers can update own company" ON companies;
DROP POLICY IF EXISTS "Employers can create company profiles" ON companies;

-- Create new simplified policies
CREATE POLICY "Allow company creation for authenticated users"
ON companies FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow company viewing for authenticated users"
ON companies FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Allow company updates for owners"
ON companies FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow company deletion for owners"
ON companies FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);