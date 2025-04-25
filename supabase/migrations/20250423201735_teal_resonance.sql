/*
  # Initial Schema Setup

  1. New Tables
    - `profiles` - Stores user profile information
    - `questionnaires` - Stores user questionnaire responses
    - `skin_analyses` - Stores AI skin analysis results
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create questionnaires table
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  age TEXT,
  location TEXT,
  marital_status TEXT,
  existing_conditions TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  medications TEXT,
  regular_cycle BOOLEAN DEFAULT true,
  pregnant BOOLEAN DEFAULT false,
  skin_type TEXT,
  primary_concerns TEXT[] DEFAULT '{}',
  current_products TEXT,
  photo_url TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create skin analyses table
CREATE TABLE IF NOT EXISTS skin_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skin_type TEXT,
  detected_concerns TEXT[] DEFAULT '{}',
  hydration_level INTEGER,
  routine JSONB,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for questionnaires table
CREATE POLICY "Users can manage their own questionnaire"
  ON questionnaires
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for skin_analyses table
CREATE POLICY "Users can view their own skin analyses"
  ON skin_analyses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skin analyses"
  ON skin_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for skin images
INSERT INTO storage.buckets (id, name, public)
VALUES ('skin-images', 'skin-images', true);

-- Set up storage policy
CREATE POLICY "Users can upload their own images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'skin-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'skin-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'skin-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can read public images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'skin-images' AND public = true);