/*
  # Fix companies table RLS policies

  1. Security
    - Enable RLS on companies table
    - Add policies for INSERT, SELECT, and UPDATE operations
    - Ensure policies don't conflict with existing ones
*/

-- Enable RLS if not already enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Employers can create companies" ON companies;
  DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
  DROP POLICY IF EXISTS "Employers can update own company" ON companies;
  
  -- Create policy for inserting companies
  CREATE POLICY "Employers can create companies"
    ON companies
    FOR INSERT
    TO authenticated
    WITH CHECK (
      -- Ensure user_id matches the authenticated user's ID
      auth.uid() = user_id
      -- Check that the user is an employer
      AND EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND user_type = 'employer'
      )
    );

  -- Create policy for viewing companies
  CREATE POLICY "Companies are viewable by everyone"
    ON companies
    FOR SELECT
    TO authenticated
    USING (true);

  -- Create policy for updating companies
  CREATE POLICY "Employers can update own company"
    ON companies
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;