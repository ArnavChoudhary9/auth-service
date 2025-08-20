import { ForgotPasswordForm } from "@/components/forgot-password-form"
import handleForgotPassword from "./actions";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm handleForgotPassword={handleForgotPassword} />
      </div>
    </div>
  )
}
