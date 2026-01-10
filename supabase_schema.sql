-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. User Progress Table (A0, A1, B1, etc.)
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  proficiency INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, topic_id)
);

-- 3. SRS Data Table (Spaced Repetition)
CREATE TABLE srs_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  interval INTEGER DEFAULT 0,
  ease_factor FLOAT DEFAULT 2.5,
  next_review TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  step INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, word_id)
);

-- 4. Custom Folders
CREATE TABLE custom_folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 5. Custom Words
CREATE TABLE custom_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  folder_id UUID REFERENCES custom_folders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  german TEXT NOT NULL,
  russian TEXT NOT NULL,
  type TEXT,
  article TEXT,
  plural TEXT,
  plural_article TEXT,
  example_singular TEXT,
  example_plural TEXT,
  conjugation TEXT, -- JSON string or comma separated
  synonyms JSONB, -- Array of {word, translation}
  antonyms JSONB, -- Array of {word, translation}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- ENABLE RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE srs_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_words ENABLE ROW LEVEL SECURITY;

-- POLICIES (Users can only see/edit their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own srs" ON srs_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own srs" ON srs_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own srs" ON srs_data FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own folders" ON custom_folders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own folders" ON custom_folders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own folders" ON custom_folders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own folders" ON custom_folders FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own words" ON custom_words FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own words" ON custom_words FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own words" ON custom_words FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own words" ON custom_words FOR DELETE USING (auth.uid() = user_id);
