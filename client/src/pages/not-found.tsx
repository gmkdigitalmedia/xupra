import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const goToDashboard = () => {
    setLocation("/dashboard");
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-4 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-6">
            <AlertCircle className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          </div>

          <p className="mt-4 text-center text-muted-foreground mb-6">
            The page you're looking for doesn't exist or you may not have access to it.
          </p>
          
          <div className="flex justify-center">
            <Button onClick={goToDashboard}>
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
