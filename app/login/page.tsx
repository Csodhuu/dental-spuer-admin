import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-none bg-gradient-to-br from-[#14081f] via-[#09020f] to-[#050505]">
          <CardHeader className="space-y-6">
            <Badge className="w-fit bg-primary/30 text-primary">
              Dental Network
            </Badge>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-semibold text-foreground">
                Welcome back
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Sign in with your work email to access the super admin
                dashboard.
              </CardDescription>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">What you can do:</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  • Monitor chair utilization across all clinics in real time.
                </li>
                <li>• Approve treatment plans and manage compliance.</li>
                <li>
                  • Coordinate staffing and follow-ups with a single view.
                </li>
              </ul>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
              <span>All systems operational</span>
            </div>
            <p>
              Need an account?{" "}
              <Link href="#" className="text-primary hover:underline">
                Request access from IT support
              </Link>
            </p>
          </CardFooter>
        </Card>

        <Card className="border border-border/60 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Use your credentials to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@clinic.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <Button className="w-full" type="submit">
              Sign in
            </Button>

            <div className="space-y-4">
              <Separator className="bg-border/80" />
              <Button className="w-full" variant="outline">
                Continue with single sign-on
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Quick access:</span>
              <Link href="/dashboard" className="text-primary hover:underline">
                View sample dashboard
              </Link>
            </div>
            <p className="leading-relaxed">
              By signing in you agree to follow our HIPAA compliance guidelines
              and data sharing policies.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
