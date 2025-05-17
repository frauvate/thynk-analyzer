/*
  # Fix Companies Table RLS Policies

  1. Changes
    - Drop existing RLS policies for companies table
    - Create new, properly configured RLS policies for companies table
      - INSERT: Allow authenticated users to create companies with their user_id
      - SELECT: Allow everyone to view companies
      - UPDATE: Allow users to update their own companies
      - DELETE: Allow users to delete their own companies

  2. Security
    - Ensures proper RLS enforcement
    - Maintains data integrity and security
    - Prevents unauthorized access while allowing legitimate operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Users can update own company" ON companies;

-- Create new policies
CREATE POLICY "Enable read access for all users" 
ON companies FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for authenticated users" 
ON companies FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" 
ON companies FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" 
ON companies FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);