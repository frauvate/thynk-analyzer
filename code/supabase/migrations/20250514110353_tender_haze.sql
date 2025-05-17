/*
  # Add foreign key constraint to job_applications table

  1. Changes
    - Add foreign key constraint from job_applications.job_id to jobs.id
    - This establishes the relationship needed for Supabase's join functionality

  2. Security
    - No changes to RLS policies
*/

DO $$ BEGIN
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