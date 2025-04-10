"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 11 && password.length === 6) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your phone number and 6-digit PIN to login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 11) setPhone(val);
              }}
              maxLength={11}
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2 relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              inputMode="numeric"
              placeholder="6-digit PIN"
              value={password}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 6) setPassword(val);
              }}
              required
              className="h-12 text-lg pr-10"
              maxLength={6}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-medium"
            disabled={password.length !== 6}
          >
            Login
          </Button>
        </form>

        <div className="mt-2 mb-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
          >
            Forgot PIN?
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup/sender"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
