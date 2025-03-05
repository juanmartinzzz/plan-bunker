-- Drop the survival_plans table if it exists
DROP TABLE IF EXISTS public.survival_plans;

-- Create the survival_plans table
CREATE TABLE IF NOT EXISTS public.survival_plans (
  id TEXT PRIMARY KEY,
  -- user_id UUID REFERENCES auth.users(id),
  scenario TEXT NOT NULL,
  custom_scenario TEXT,
  meeting_point TEXT,
  masterplan TEXT,
  items JSONB,
  timeline JSONB,
  ip_address TEXT,
  browser_info TEXT,
  geo_language TEXT,
  geo_country TEXT,
  geo_region TEXT,
  geo_city TEXT,
  geo_latitude TEXT,
  geo_longitude TEXT,
  geo_timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
-- ALTER TABLE public.survival_plans ENABLE ROW LEVEL SECURITY;

-- -- Create policies for Row Level Security
-- -- Allow users to select their own plans
-- CREATE POLICY "Users can view their own plans"
--   ON public.survival_plans
--   FOR SELECT
--   USING (auth.uid() = user_id);

-- -- Allow users to insert their own plans
-- CREATE POLICY "Users can insert their own plans"
--   ON public.survival_plans
--   FOR INSERT
--   WITH CHECK (auth.uid() = user_id);

-- -- Allow users to update their own plans
-- CREATE POLICY "Users can update their own plans"
--   ON public.survival_plans
--   FOR UPDATE
--   USING (auth.uid() = user_id);

-- -- Allow users to delete their own plans
-- CREATE POLICY "Users can delete their own plans"
--   ON public.survival_plans
--   FOR DELETE
--   USING (auth.uid() = user_id);

-- -- Create an index on user_id for faster queries
-- CREATE INDEX survival_plans_user_id_idx ON public.survival_plans (user_id);

-- Add a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before update
CREATE TRIGGER update_survival_plans_updated_at
BEFORE UPDATE ON public.survival_plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();