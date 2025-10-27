import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roles) {
        switch (roles.role) {
          case "donor":
            navigate("/donor");
            break;
          case "ngo":
            navigate("/ngo");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/auth");
        }
      } else {
        navigate("/auth");
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Index;
