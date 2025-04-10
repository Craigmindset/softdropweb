"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Removed icons import since the module wasn't found

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-lg">☰</span>
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl">🚚</span>
            <span className="font-bold">Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <span className="text-lg">🔔</span>
          </Button>
          <Button variant="ghost" size="icon">
            <span className="text-lg">👤</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
