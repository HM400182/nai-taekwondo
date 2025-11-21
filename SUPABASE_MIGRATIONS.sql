-- ============================================
-- TAEKWONDO WEBSITE - SUPABASE MIGRATIONS
-- ============================================
-- Run these SQL commands in your Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query)

-- 1. Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table (SECURE - prevents privilege escalation)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Create coaches table
CREATE TABLE public.coaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- Coaches policies
CREATE POLICY "Anyone can view coaches"
    ON public.coaches FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert coaches"
    ON public.coaches FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update coaches"
    ON public.coaches FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete coaches"
    ON public.coaches FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 5. Create events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT,
    location TEXT,
    description TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Anyone can view events"
    ON public.events FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert events"
    ON public.events FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update events"
    ON public.events FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete events"
    ON public.events FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 6. Create announcements table
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Announcements policies
CREATE POLICY "Anyone can view announcements"
    ON public.announcements FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert announcements"
    ON public.announcements FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update announcements"
    ON public.announcements FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete announcements"
    ON public.announcements FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 7. Create media table
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL, -- 'image' or 'video'
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Media policies
CREATE POLICY "Anyone can view media"
    ON public.media FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert media"
    ON public.media FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update media"
    ON public.media FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete media"
    ON public.media FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create gallery table
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    caption TEXT NOT NULL,
    category TEXT NOT NULL,
    public_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Gallery policies
CREATE POLICY "Anyone can view gallery"
    ON public.gallery FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert gallery"
    ON public.gallery FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update gallery"
    ON public.gallery FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete gallery"
    ON public.gallery FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 9. Create storage buckets for photos and media
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('coaches', 'coaches', true),
  ('media', 'media', true),
  ('gallery', 'gallery', true);

-- Storage policies for coaches bucket
CREATE POLICY "Anyone can view coaches photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'coaches');

CREATE POLICY "Admins can upload coaches photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'coaches' 
        AND public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Admins can delete coaches photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'coaches' 
        AND public.has_role(auth.uid(), 'admin')
    );

-- Storage policies for media bucket
CREATE POLICY "Anyone can view media files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'media' 
        AND public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Admins can delete media files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'media' 
        AND public.has_role(auth.uid(), 'admin')
    );

-- Storage policies for gallery bucket
CREATE POLICY "Anyone can view gallery photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'gallery' 
        AND public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Admins can delete gallery photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'gallery' 
        AND public.has_role(auth.uid(), 'admin')
    );

-- 10. Create registrations table (for Join page form)
CREATE TABLE public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    age TEXT,
    experience_level TEXT,
    goals TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit registrations"
    ON public.registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view registrations"
    ON public.registrations FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 11. Create messages table (for contact form)
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit messages"
    ON public.messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view messages"
    ON public.messages FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- 12. Grant admin role to your emails
-- IMPORTANT: First, these users need to sign up in your app
-- Then run these commands with their actual user IDs:
-- 
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES 
--   ('USER_ID_FOR_mukakahillary26@gmail.com', 'admin'),
--   ('USER_ID_FOR_telo18429@gmail.com', 'admin');
--
-- To find user IDs, run: SELECT id, email FROM auth.users;

-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- 1. Copy this entire SQL file
-- 2. Go to your Supabase Dashboard
-- 3. Navigate to SQL Editor
-- 4. Click "New Query"
-- 5. Paste and run this SQL
-- 6. After running, sign up with your admin emails in the app
-- 7. Then grant admin roles using the commands above
-- ============================================
