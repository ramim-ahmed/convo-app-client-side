import axios from "@/axios/axios";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const handleSignInUser = async () => {
    await signInUser();
    const { data } = await axios.get("/posts/token");
    console.log(data);
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div>
        <Button
          onClick={() => handleSignInUser()}
          className="border border-green-500"
        >
          SignIn With Google
        </Button>
      </div>
    </div>
  );
}
