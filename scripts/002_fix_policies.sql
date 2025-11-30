-- Drop existing policies if they exist (safe cleanup)
DROP POLICY IF EXISTS "Allow public read on departments" ON public.departments;
DROP POLICY IF EXISTS "Allow public read on years" ON public.years;
DROP POLICY IF EXISTS "Allow public read on semesters" ON public.semesters;
DROP POLICY IF EXISTS "Allow public read on exam_types" ON public.exam_types;
DROP POLICY IF EXISTS "Allow public read on exams" ON public.exams;
DROP POLICY IF EXISTS "Allow public insert on exams" ON public.exams;

-- Recreate policies with proper error handling
CREATE POLICY "Allow public read on departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Allow public read on years" ON public.years FOR SELECT USING (true);
CREATE POLICY "Allow public read on semesters" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Allow public read on exam_types" ON public.exam_types FOR SELECT USING (true);
CREATE POLICY "Allow public read on exams" ON public.exams FOR SELECT USING (true);

-- Allow anyone to insert exams (no authentication required)
CREATE POLICY "Allow public insert on exams" ON public.exams FOR INSERT WITH CHECK (true);
