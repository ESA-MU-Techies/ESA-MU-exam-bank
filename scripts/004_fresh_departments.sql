-- Drop existing departments table and cascade delete related records
DROP TABLE IF EXISTS public.departments CASCADE;

-- Recreate departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DROP POLICY IF EXISTS "Allow public read on departments" ON public.departments;
CREATE POLICY "Allow public read on departments" ON public.departments FOR SELECT USING (true);

-- Insert correct departments
INSERT INTO public.departments (code, name) VALUES
  ('MPE', 'Mechanical and Production Engineering'),
  ('TLE', 'Electrical and Telecommunication Engineering'),
  ('EC', 'Electrical and Electronics Engineering'),
  ('CPE', 'Chemical and Processing Engineering'),
  ('CSE', 'Civil and Structural Engineering');
