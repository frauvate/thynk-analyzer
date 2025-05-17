-- Drop employer-related tables
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TYPE IF EXISTS job_type_enum CASCADE;

-- Update profiles table to remove employer type
ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_user_type_check;

ALTER TABLE profiles
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type = 'job_seeker');

-- Update existing profiles to job_seeker type
UPDATE profiles 
SET user_type = 'job_seeker' 
WHERE user_type = 'employer';