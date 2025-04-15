
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <ChefHat className="h-20 w-20 text-recipe-primary mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! This recipe seems to be missing from our cookbook.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Return to Kitchen
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
