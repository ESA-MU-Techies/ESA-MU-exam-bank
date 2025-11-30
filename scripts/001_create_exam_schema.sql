-- Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create years table
CREATE TABLE IF NOT EXISTS public.years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_number INT NOT NULL CHECK (year_number >= 1 AND year_number <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(year_number)
);

-- Create semesters table
CREATE TABLE IF NOT EXISTS public.semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES public.years(id) ON DELETE CASCADE,
  semester_number INT NOT NULL CHECK (semester_number IN (1, 2)),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(year_id, semester_number)
);

-- Create exam types table
CREATE TABLE IF NOT EXISTS public.exam_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create exams table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  semester_id UUID NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  exam_type_id UUID NOT NULL REFERENCES public.exam_types(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_code TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INT,
  uploaded_by TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required)
CREATE POLICY "Allow public read on departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Allow public read on years" ON public.years FOR SELECT USING (true);
CREATE POLICY "Allow public read on semesters" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Allow public read on exam_types" ON public.exam_types FOR SELECT USING (true);
CREATE POLICY "Allow public read on exams" ON public.exams FOR SELECT USING (true);

-- Allow anyone to insert exams (no authentication required)
CREATE POLICY "Allow public insert on exams" ON public.exams FOR INSERT WITH CHECK (true);

-- Updated department names to match correct abbreviations
-- Insert departments
INSERT INTO public.departments (code, name) VALUES
  ('MPE', 'Mechanical and Production Engineering'),
  ('TLE', 'Electrical and Telecommunication Engineering'),
  ('EC', 'Electrical and Electronics Engineering'),
  ('CPE', 'Chemical and Processing Engineering'),
  ('CSE', 'Civil and Structural Engineering')
ON CONFLICT DO NOTHING;

-- Insert years
INSERT INTO public.years (year_number) VALUES (1), (2), (3), (4), (5)
ON CONFLICT DO NOTHING;

-- Insert semesters
INSERT INTO public.semesters (year_id, semester_number)
SELECT y.id, s.semester_number
FROM public.years y
CROSS JOIN (SELECT 1 as semester_number UNION SELECT 2) s
ON CONFLICT DO NOTHING;

-- Insert exam types
INSERT INTO public.exam_types (name) VALUES
  ('CAT 1'),
  ('CAT 2'),
  ('Main Exam'),
  ('Supplementary Exam')
ON CONFLICT DO NOTHING;
