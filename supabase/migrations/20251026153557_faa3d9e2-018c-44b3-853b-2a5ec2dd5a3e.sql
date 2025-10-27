-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'donor', 'ngo', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
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

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Trigger to assign role based on user_type
CREATE OR REPLACE FUNCTION public.assign_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.user_type = 'donor' THEN 'donor'::app_role
      WHEN NEW.user_type = 'ngo' THEN 'ngo'::app_role
      WHEN NEW.user_type = 'user' THEN 'user'::app_role
      ELSE 'user'::app_role
    END
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_user_role();

-- RLS policies for user_roles
CREATE POLICY "Users can view their own role"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create donation_requests table
CREATE TABLE public.donation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ngo_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('food', 'books')),
  items TEXT NOT NULL,
  details TEXT,
  location_address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Donors can view their own requests"
  ON public.donation_requests
  FOR SELECT
  USING (auth.uid() = donor_id);

CREATE POLICY "Donors can create requests"
  ON public.donation_requests
  FOR INSERT
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "NGOs can view all requests"
  ON public.donation_requests
  FOR SELECT
  USING (public.has_role(auth.uid(), 'ngo'));

CREATE POLICY "NGOs can update requests"
  ON public.donation_requests
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'ngo'));

CREATE POLICY "Admins can view all requests"
  ON public.donation_requests
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create feedback_reviews table
CREATE TABLE public.feedback_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  donation_request_id UUID REFERENCES public.donation_requests(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.feedback_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own feedback"
  ON public.feedback_reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view feedback"
  ON public.feedback_reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can view all feedback"
  ON public.feedback_reviews
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updating updated_at
CREATE TRIGGER update_donation_requests_updated_at
  BEFORE UPDATE ON public.donation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();