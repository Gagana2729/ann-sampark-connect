import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Users, Package, MapPin, LogOut, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    donors: 0,
    ngos: 0,
    totalRequests: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: roles } = await supabase
      .from("user_roles")
      .select("*");

    const profilesWithRoles = profiles?.map(profile => ({
      ...profile,
      role: roles?.find(r => r.user_id === profile.id)?.role
    }));

    const { data: donationRequests } = await supabase
      .from("donation_requests")
      .select("*, donor:profiles!donation_requests_donor_id_fkey(full_name, email)")
      .order("created_at", { ascending: false });

    setUsers(profilesWithRoles || []);
    setRequests(donationRequests || []);

    setStats({
      totalUsers: profilesWithRoles?.length || 0,
      donors: profilesWithRoles?.filter(p => p.role === "donor").length || 0,
      ngos: profilesWithRoles?.filter(p => p.role === "ngo").length || 0,
      totalRequests: donationRequests?.length || 0,
      pending: donationRequests?.filter(r => r.status === "pending").length || 0,
      accepted: donationRequests?.filter(r => r.status === "accepted").length || 0,
      rejected: donationRequests?.filter(r => r.status === "rejected").length || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">AnnSampark Admin</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage the entire platform</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Package className="h-5 w-5" />
                Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.donors}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <MapPin className="h-5 w-5" />
                NGOs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{stats.ngos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <BarChart3 className="h-5 w-5" />
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">{stats.totalRequests}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="requests">Donation Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <h2 className="text-2xl font-bold">Registered Users</h2>
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-semibold">{user.full_name || "N/A"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                        {user.organization_name && (
                          <p className="text-sm"><strong>Organization:</strong> {user.organization_name}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary capitalize">
                          {user.role || user.user_type}
                        </span>
                        <p className="text-xs text-muted-foreground mt-2">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-2xl font-bold">All Donation Requests</h2>
            <div className="grid gap-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="capitalize">{request.donation_type}</CardTitle>
                        <p className="text-sm text-muted-foreground">{request.items}</p>
                      </div>
                      <span className={`font-semibold capitalize ${
                        request.status === "accepted" ? "text-green-600" :
                        request.status === "rejected" ? "text-red-600" :
                        request.status === "completed" ? "text-blue-600" :
                        "text-yellow-600"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p><strong>Donor:</strong> {request.donor?.full_name || "Unknown"}</p>
                      <p><strong>Location:</strong> {request.location_address}</p>
                      <p><strong>Details:</strong> {request.details || "N/A"}</p>
                      <p><strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Accepted Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-600">{stats.accepted}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Rejected Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Acceptance Rate</span>
                    <span className="font-semibold">
                      {stats.totalRequests > 0
                        ? Math.round((stats.accepted / stats.totalRequests) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${stats.totalRequests > 0
                          ? (stats.accepted / stats.totalRequests) * 100
                          : 0}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
