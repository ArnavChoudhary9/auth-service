'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    redirect(`/auth/login?error=${encodeURIComponent("Email and password are required")}`)
  }

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    redirect(`/auth/login?error=${encodeURIComponent("Invalid email or password")}`)
  }
  
  const data = {
    email: email as string,
    password: password as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/private', 'layout')
  redirect('/private')
}
