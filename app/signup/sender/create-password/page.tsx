"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CreatePassword() {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin !== confirmPin) {
      setError("Pins do not match");
      return;
    }
    if (pin.length !== 6) {
      setError("Pin must be 6 digits");
      return;
    }
    // Show success message
    setIsSuccess(true);
    // Redirect to login after 5 seconds
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Set up a secure 6-digit PIN for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="pin"
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 6-digit PIN"
                value={pin}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, "");
                  if (input.length <= 6) {
                    setPin(input);
                    setError("");
                  }
                }}
                required
                className="h-12 pl-10 pr-10 text-lg"
                maxLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPin(!showPin)}
              >
                {showPin ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="confirmPin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Confirm 6-digit PIN"
                value={confirmPin}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, "");
                  if (input.length <= 6) {
                    setConfirmPin(input);
                    setError("");
                  }
                }}
                required
                className="h-12 pl-10 text-lg"
                maxLength={6}
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-medium"
            disabled={
              pin.length !== 6 || confirmPin.length !== 6 || pin !== confirmPin
            }
          >
            Create Account
          </Button>
        </form>
      </div>
      
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 max-w-sm w-full text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your account has been created successfully</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="bg-green-500 h-2.5 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
