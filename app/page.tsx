"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { login } from "./login/hook";

export default function LoginPage() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      setCookie("accessToken", data.accessToken);
      router.push("/dashboard");
    },
  });

  const handleLogin = async () => {
    if (!loginInput.username || !loginInput.password) {
      return;
    }
    await toast.promise(
      mutation.mutateAsync({
        username: loginInput.username,
        password: loginInput.password,
      }),
      {
        loading: "Нэвтэрч байна...",
        success: "Амжилттай нэвтэрлээ",
        error: "Нэвтрэхэд алдаа гарлаа",
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

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
                Sign in with your credentials to access the super admin
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

        {/* Right / Auth */}
        <Card className="border border-border/60 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Use your credentials to continue.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700">
                И-мэйл
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  id="email"
                  placeholder="your.email@example.com"
                  className="border-blue-200 pl-10 focus:border-blue-400 focus:ring-blue-400"
                  value={loginInput.username || ""}
                  onKeyPress={handleKeyPress}
                  onChange={(e) =>
                    setLoginInput({ ...loginInput, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-blue-700">
                  Нууц үг
                </Label>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Нууц үгээ мартсан ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                value={loginInput.password || ""}
                onKeyPress={handleKeyPress}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
              />
            </div>

            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center"
              onClick={handleLogin}
              disabled={mutation.isPending}
            >
              <>
                Нэвтрэх
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            </Button>
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
