import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "@/context/Authcontext";

const Buyer = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Browse Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore a variety of pets available for adoption or purchase.</p>
            <Button className="mt-4">Browse Pets</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your past and current pet orders.</p>
            <Button className="mt-4">View Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Save your favorite pets for future consideration.</p>
            <Button className="mt-4">View Wishlist</Button>
          </CardContent>
        </Card>
      </div>

      <Button
        className="mt-8"
        variant="destructive"
        onClick={async () => {
          await logout();
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Buyer;
