"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import api from "@/lib/api";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!auth) throw new Error("Firebase is not initialized. Please check your .env.local file.");
      
      // 1. Create user in Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // 2. Synchronize with MongoDB
      await api.post("/auth/sync", {
        firstname: formData.firstname,
        lastname: formData.lastname,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration Error:", err);
      let message = "Failed to create account. Please try again.";
      
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please sign in instead.";
      } else if (err.code === "auth/weak-password") {
        message = "Password is too weak. Please use at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstname"
          placeholder="Jane"
          value={formData.firstname}
          onChange={handleChange}
          icon={<UserIcon size={18} />}
          required
        />
        <Input
          label="Last Name"
          name="lastname"
          placeholder="Doe"
          value={formData.lastname}
          onChange={handleChange}
          icon={<UserIcon size={18} />}
          required
        />
      </div>
      <div className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail size={18} />}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          icon={<Lock size={18} />}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      <Button type="submit" className="w-full" isLoading={loading}>
        Create Account
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-[#2D016C] hover:underline">
          Sign In
        </a>
      </div>
    </form>
  );
};
