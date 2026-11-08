"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, School, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("SignUp response:", { data, error });

      if (error) {
        setError(error.message || "Gagal mendaftar");
        return;
      }

      // Redirect to admin after successful registration
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("SignUp error:", err);
      setError("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <School className="h-8 w-8" />
          </div>
          <CardTitle>Buat Akun Admin</CardTitle>
          <CardDescription>
            Daftar untuk mengakses dashboard admin
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Administrator"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="admin@smkyp17.sch.id"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mendaftar...
                </>
              ) : (
                "Daftar"
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <a href="/auth" className="text-primary hover:underline">
                Masuk
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
