import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("userRole"); // Remove role
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View, edit, and remove users from the system.</p>
            <Button className="mt-4">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Approve or reject seller registrations.</p>
            <Button className="mt-4">Review Sellers</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View sales reports and website statistics.</p>
            <Button className="mt-4">View Analytics</Button>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-8" variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Admin;
