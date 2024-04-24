import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <div className="border-b shadow">
      <nav className="max-w-3xl mx-auto flex justify-between px-3 items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">Convo App</h1>
        </Link>
        <Button variant="outline" className="rounded-none">
          SignIn
        </Button>
      </nav>
    </div>
  );
}
