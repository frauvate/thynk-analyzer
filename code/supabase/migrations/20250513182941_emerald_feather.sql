/*
  # Fix companies table RLS policies

  1. Changes
    - Add RLS policy for company creation
    - Ensure employers can create companies when user_id matches their ID
    - Maintain existing policies for viewing and updating

  2. Security
    - Adds INSERT policy for authenticated users
    - Only allows users to create companies where they are the owner (user_id matches auth.uid())
    - Maintains data integrity by enforcing user ownership
*/

-- Add policy to allow authenticated users to create companies where they are the owner
CREATE POLICY "Employers can create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'employer'
  )
);