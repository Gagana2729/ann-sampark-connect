import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Leaf, MapPin, Package, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    donation_type: "food",
    items: "",
    details: "",
    location_address: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("donation_requests")
      .select("*")
      .eq("donor_id", user.id)
      .order("created_at", { ascending: false });

    setRequests(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("donation_requests").insert({
      donor_id: user.id,
      ...formData,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Donation request created successfully!",
      });
      setShowForm(false);
      setFormData({
        donation_type: "food",
        items: "",
        details: "",
        location_address: "",
        latitude: null,
        longitude: null,
      });
      fetchRequests();
    }
    setLoading(false);
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
          <h1 className="text-4xl font-bold gradient-text mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">Manage your donations and track their impact</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{requests.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
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
              <CardTitle className="flex items-center gap-2">
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
        </div>

        {!showForm ? (
          <Button onClick={() => setShowForm(true)} size="lg" className="mb-6">
            Create New Donation Request
          </Button>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Donation Request</CardTitle>
              <CardDescription>Fill in the details of your donation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donation_type">Donation Type</Label>
                  <Select
                    value={formData.donation_type}
                    onValueChange={(value) => setFormData({ ...formData, donation_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items">Items</Label>
                  <Input
                    id="items"
                    value={formData.items}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                    placeholder="e.g., Rice, Vegetables, Textbooks"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Additional information about the donation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location_address">Pickup Location</Label>
                  <Input
                    id="location_address"
                    value={formData.location_address}
                    onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                    placeholder="Full address for pickup"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Request"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">My Donation Requests</h2>
          {requests.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No donation requests yet. Create your first one!
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="capitalize">{request.donation_type}</CardTitle>
                      <CardDescription>{request.items}</CardDescription>
                    </div>
                    <span className={`font-semibold capitalize ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Details:</strong> {request.details || "N/A"}</p>
                    <p><strong>Location:</strong> {request.location_address}</p>
                    <p><strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
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

export default DonorDashboard;
