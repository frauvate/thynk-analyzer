/*
  # Add benefits column to jobs table

  1. Changes
    - Add benefits column to jobs table as text array with default empty array
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' 
    AND column_name = 'benefits'
  ) THEN
    ALTER TABLE jobs 
    ADD COLUMN benefits text[] NOT NULL DEFAULT '{}';
  END IF;
END $$;