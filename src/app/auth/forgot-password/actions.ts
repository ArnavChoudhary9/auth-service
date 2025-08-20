'use server';

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function handleForgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email");

  if (!email) {
    redirect(`/auth/forgot-password?error=${encodeURIComponent("Email is required")}`)
  }

  if (typeof email !== 'string' || !email) {
    redirect(`/auth/forgot-password?error=${encodeURIComponent("Invalid email")}`)
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    redirect(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/auth/forgot-password?msg=${encodeURIComponent("Password reset email sent")}`);
};