import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, MapPin, Package, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NGODashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel("donation_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "donation_requests",
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("donation_requests")
      .select("*, donor:profiles!donation_requests_donor_id_fkey(full_name, email, phone)")
      .order("created_at", { ascending: false });

    setRequests(data || []);
  };

  const handleAction = async (id: string, status: string) => {
    setLoading(id);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("donation_requests")
      .update({ status, ngo_id: user?.id })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Request ${status} successfully!`,
      });
    }
    setLoading(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "text-green-600";
      case "rejected": return "text-red-600";
      case "completed": return "text-blue-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">AnnSampark</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">NGO Dashboard</h1>
          <p className="text-muted-foreground">Manage donation requests from donors</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{requests.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-600">
                <MapPin className="h-5 w-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {requests.filter(r => r.status === "pending").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Accepted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {requests.filter(r => r.status === "accepted").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {requests.filter(r => r.status === "rejected").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Donation Requests</h2>
          {requests.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No donation requests available yet.
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="capitalize">{request.donation_type} Donation</CardTitle>
                      <CardDescription>{request.items}</CardDescription>
                    </div>
                    <span className={`font-semibold capitalize ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1 text-sm">
                      <p><strong>Details:</strong> {request.details || "N/A"}</p>
                      <p><strong>Location:</strong> {request.location_address}</p>
                      <p><strong>Donor:</strong> {request.donor?.full_name || "Unknown"}</p>
                      {request.donor?.email && <p><strong>Email:</strong> {request.donor.email}</p>}
                      {request.donor?.phone && <p><strong>Phone:</strong> {request.donor.phone}</p>}
                      <p><strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleAction(request.id, "accepted")}
                          disabled={loading === request.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleAction(request.id, "rejected")}
                          disabled={loading === request.id}
                          variant="destructive"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NGODashboard;
