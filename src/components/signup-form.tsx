'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link"

interface SignupFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  handleSignup: (formData: FormData) => void | Promise<void>;
  [key: string]: unknown;
}

export function SignupForm({
  className,
  handleSignup,
  ...props
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('msg');

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await handleSignup(formData);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-500 text-sm">
                    {success}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}