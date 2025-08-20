'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (!email || !password || !confirmPassword) {
    redirect(`/auth/signup?error=${encodeURIComponent('Email, password, and confirm password are required')}`);
  }

  if (typeof email !== 'string' || typeof password !== 'string' || typeof confirmPassword !== 'string' || !email || !password || !confirmPassword) {
    redirect(`/auth/signup?error=${encodeURIComponent('Invalid email, password, or confirm password')}`);
  }
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    redirect(`/auth/signup?error=${encodeURIComponent('Invalid email format')}`);
  }

  if (password.length < 8) {
    redirect(`/auth/signup?error=${encodeURIComponent('Password must be at least 8 characters long')}`);
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    redirect(`/auth/signup?error=${encodeURIComponent('Password must contain both letters and numbers')}`);
  }

  if (password !== confirmPassword) {
    redirect(`/auth/signup?error=${encodeURIComponent('Passwords do not match')}`);
  }

  const data = {
    email: email as string,
    password: password as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/signup', 'layout')
  redirect(`/auth/signup?msg=${encodeURIComponent('Check your email for the confirmation link')}`)
}
