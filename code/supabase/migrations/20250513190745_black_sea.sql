/*
  # Add foreign key relationship between jobs and job_applications tables

  1. Changes
    - Add foreign key constraint from job_applications.job_id to jobs.id
    - This enables proper relationship querying between the tables
    - Ensures referential integrity between jobs and their applications

  2. Security
    - No changes to RLS policies
    - Existing table security remains unchanged
*/

DO $$ BEGIN
  -- Add foreign key constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'job_applications_job_id_fkey'
  ) THEN
    ALTER TABLE job_applications
    ADD CONSTRAINT job_applications_job_id_fkey
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE;
  END IF;
END $$;