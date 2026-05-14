-- Create tables for KMR TECHIES LMS

-- Enable RLS
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  duration TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  syllabus JSONB,
  prerequisites TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Certifications table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  provider TEXT,
  duration TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  skills_covered TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Trainings table
CREATE TABLE IF NOT EXISTS public.trainings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  duration TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  schedule JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Academic Programs table
CREATE TABLE IF NOT EXISTS public.academic_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  duration TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  curriculum JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Careers table
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  type TEXT NOT NULL,
  salary_range TEXT,
  requirements TEXT[],
  benefits TEXT[],
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Student enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0,
  UNIQUE(student_id, course_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can read/update their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Courses: Everyone can read, only admins can modify
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Similar policies for other tables
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Admins can manage certifications" ON public.certifications FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Public read trainings" ON public.trainings FOR SELECT USING (true);
CREATE POLICY "Admins can manage trainings" ON public.trainings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Public read academic_programs" ON public.academic_programs FOR SELECT USING (true);
CREATE POLICY "Admins can manage academic_programs" ON public.academic_programs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Public read careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Admins can manage careers" ON public.careers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Enrollments: Students can view their own, admins can view all
CREATE POLICY "Students can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can enroll themselves" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own enrollments" ON public.enrollments FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Admins can manage enrollments" ON public.enrollments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON public.trainings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_academic_programs_updated_at BEFORE UPDATE ON public.academic_programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON public.careers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();