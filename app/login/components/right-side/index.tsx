"use client";

import { ArrowRight, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { login } from "../../hooks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function RightSide() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCookie("accessToken", data.accessToken);
      router.push("/hospitals");
    },
  });

  const handleLogin = async () => {
    if (!loginInput.username || !loginInput.password) return;
    if (mutation.isPending) return;

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

  return (
    <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="md:hidden flex items-center justify-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-700">SecureLogin</h1>
        </div>

        <Card className="border-blue-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center text-blue-800">
              Өөрийн бүртгэлээр нэвтэрнэ үү
            </CardTitle>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-700">
                  И-мэйл
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="email"
                    autoComplete="username"
                    placeholder="Нэвтрэх нэр"
                    className="border-blue-200 pl-10 focus:border-blue-400 focus:ring-blue-400"
                    value={loginInput.username}
                    onChange={(e) =>
                      setLoginInput((s) => ({ ...s, username: e.target.value }))
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
                  placeholder="Нууц үг"
                  autoComplete="current-password"
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  value={loginInput.password}
                  onChange={(e) =>
                    setLoginInput((s) => ({ ...s, password: e.target.value }))
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center"
              >
                <>
                  {mutation.isPending ? "Нэвтэрч байна..." : "Нэвтрэх"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
