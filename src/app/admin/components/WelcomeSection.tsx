"use client";

import { authClient } from "@/lib/auth-client";

export function WelcomeSection() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold tracking-tight">
        {isPending ? "Memuat..." : `Selamat Datang, ${session?.user?.name}`}!
      </h2>
      <p className="text-muted-foreground">
        Kelola berita dan konten website sekolah Anda dari sini.
      </p>
    </div>
  );
}
