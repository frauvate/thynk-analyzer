/*
  # Add RLS policy for company creation

  1. Security Changes
    - Add RLS policy to allow employers to create their own company profiles
    - Policy ensures user_id matches authenticated user's ID
    - Policy ensures user has employer role in profiles table
*/

-- Add policy for company creation
CREATE POLICY "Employers can create company profiles"
ON companies
FOR INSERT
WITH CHECK (
  -- Ensure user_id matches authenticated user
  user_id = auth.uid() 
  AND 
  -- Ensure user is an employer
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND user_type = 'employer'
  )
);