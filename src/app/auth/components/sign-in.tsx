"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, School, AlertCircle } from "lucide-react";

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
import { signIn } from "@/lib/auth-client";

// Form validation types
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Validate individual field
  const validateField = (
    name: keyof FormData,
    value: string,
  ): string | undefined => {
    switch (name) {
      case "email":
        if (!value) {
          return "Email wajib diisi";
        }
        if (!EMAIL_REGEX.test(value)) {
          return "Format email tidak valid";
        }
        return undefined;
      case "password":
        if (!value) {
          return "Password wajib diisi";
        }
        if (value.length < 6) {
          return "Password minimal 6 karakter";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField("password", formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof FormData, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle form submission with Better Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (error) {
        // Handle specific error codes
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          setErrors({
            general: "Email atau password salah",
          });
        } else if (error.code === "USER_NOT_FOUND") {
          setErrors({
            general: "Akun tidak ditemukan",
          });
        } else {
          setErrors({
            general: error.message || "Terjadi kesalahan saat login",
          });
        }
        return;
      }

      // Login successful, redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        {/* Logo */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <School className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">Masuk ke Admin</CardTitle>
        <CardDescription>
          Masukkan email dan password untuk mengakses dashboard
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* General Error Alert */}
          {errors.general && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={
                errors.email && touched.email ? "border-destructive" : ""
              }
            />
            {errors.email && touched.email && (
              <p
                id="email-error"
                className="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/auth/forgot-password"
                className="text-xs text-muted-foreground hover:text-primary hover:underline"
              >
                Lupa password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`pr-10 ${errors.password && touched.password ? "border-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p
                id="password-error"
                className="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-4">
          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
