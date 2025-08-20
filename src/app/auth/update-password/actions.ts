'use server';

import { createClient } from '@/utils/supabase/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

// const handlePasswordUpdate = async (e: React.FormEvent) => {
//   e.preventDefault();
//   const supabase = createClient();
//   setIsLoading(true);
//   setError(null);

//   if (password !== repeatPassword) {
//     setError("Passwords do not match");
//     setIsLoading(false);
//     return;
//   }

//   try {
//     const token_hash = searchParams?.get("token_hash");
//     const type = searchParams?.get("type") as EmailOtpType;

//     if (!token_hash || !type) {
//       setError("Invalid token or type");
//       return;
//     }

//     const { error: verifyError } = await supabase.auth.verifyOtp({
//       type,
//       token_hash,
//     });
//     if (verifyError) throw verifyError;

//     const { error } = await supabase.auth.updateUser({
//       password,
//     });
//     if (error) throw error;

//     // Redirect to login page after successful password update
//     router.push("/auth/login");
//   } catch (error: unknown) {
//     setError(error instanceof Error ? error.message : "An error occurred");
//   } finally {
//     setIsLoading(false);
//   }
// };

export default async function handleUpdatePassword(formData: FormData) {
  const supabase = await createClient();

  const newPassword = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;

  const url = new URL(formData.get("url") as string);
  const token_hash = url.searchParams.get("token_hash") as string;
  const type = url.searchParams.get("type") as EmailOtpType;

  if (!newPassword || !repeatPassword) {
    redirect(`/auth/update-password?error=${encodeURIComponent("New password and repeat password are required")}`);
  }

  if (!token_hash || !type) {
    redirect(`/auth/update-password?error=${encodeURIComponent("Invalid token or type")}`);
  }

  if (repeatPassword !== newPassword) {
    redirect(`/auth/update-password?error=${encodeURIComponent("Passwords do not match")}`);
  }

  const { error: verifyError } = await supabase.auth.verifyOtp({
    type,
    token_hash
  });
  if (verifyError) {
    redirect(`/auth/update-password?error=${encodeURIComponent(verifyError.message)}`);
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    redirect(`/auth/update-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/auth/login?msg=${encodeURIComponent("Password updated successfully")}`);
}
