import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useAppContext } from "@/contexts/app-context";

export default function NotFound() {
  const { isLoggedIn } = useAppContext();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 bg-background-card border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
            <p className="mt-3 text-gray-400">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={isLoggedIn ? "/dashboard" : "/"}>
            <Button className="bg-primary hover:bg-primary/80">
              Return to {isLoggedIn ? "Dashboard" : "Home"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
