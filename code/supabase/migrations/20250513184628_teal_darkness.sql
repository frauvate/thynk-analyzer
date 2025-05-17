-- Drop all existing policies
DROP POLICY IF EXISTS "Employers can create companies" ON companies;
DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
DROP POLICY IF EXISTS "Employers can update own company" ON companies;

-- Make sure RLS is enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Simple policy for creating companies
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy for viewing companies
CREATE POLICY "Companies are viewable by everyone"
ON companies
FOR SELECT
TO authenticated
USING (true);

-- Policy for updating companies
CREATE POLICY "Employers can update own company"
ON companies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);