"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { login } from "@/app/auth/actions";

export function LoginForm({
  className,
  error,
  ...props
}: React.ComponentProps<"div"> & { error?: string }) {
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);

    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      window.location.href = "/user";
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Login"}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block w-full">
                        <Button
                          variant="outline"
                          type="button"
                          disabled
                          className="w-full"
                        >
                          Login with <GoogleIcon />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Currently a work in progress</p>
                    </TooltipContent>
                  </Tooltip>

                  <Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button variant="outline" type="button">
                            <MoreHorizontal />
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>More Login Methods</p>
                      </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="w-80">
                      <Link href="/auth/login/magic-link">
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full"
                        >
                          Magic Link (Email)
                        </Button>
                      </Link>
                    </PopoverContent>
                  </Popover>
                </div>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
