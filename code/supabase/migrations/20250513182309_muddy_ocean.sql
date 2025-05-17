/*
  # Create companies table

  1. New Tables
    - `companies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `website` (text, optional)
      - `logo_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `companies` table
    - Add policies for viewing, creating, and updating companies
    - Ensure one company per user with unique constraint

  3. Indexes
    - Create index on user_id for faster lookups
*/

-- Create companies table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS companies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    website text,
    logo_url text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    
    -- Ensure one company per user
    CONSTRAINT unique_user_company UNIQUE (user_id)
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Companies are viewable by everyone" ON companies;
  DROP POLICY IF EXISTS "Employers can create their company" ON companies;
  DROP POLICY IF EXISTS "Employers can update their own company" ON companies;
END $$;

-- Create policies
CREATE POLICY "Companies are viewable by everyone"
  ON companies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employers can create their company"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employers can update their own company"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index if it doesn't exist
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS companies_user_id_idx ON companies(user_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create trigger for updated_at if it doesn't exist
DO $$ BEGIN
  CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;