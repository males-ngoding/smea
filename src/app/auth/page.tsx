import SignIn from "./components/sign-in";
import { School } from "lucide-react";

const Auth = () => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm mb-6">
              <School className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">SMKS YP 17 Cilegon</h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Sistem Manajemen Konten untuk mengelola berita dan informasi
              sekolah dengan mudah dan efisien.
            </p>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
              <School className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">SMKS YP 17 Cilegon</h1>
            <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
          </div>

          <SignIn />

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2026 SMKS YP 17 Cilegon. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
