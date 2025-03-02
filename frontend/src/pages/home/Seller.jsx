import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Seller = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("userRole"); // Remove role
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Manage Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add, update, or remove pet listings.</p>
            <Button className="mt-4">Manage Listings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track and manage customer orders.</p>
            <Button className="mt-4">View Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analyze your sales and revenue.</p>
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

export default Seller;
