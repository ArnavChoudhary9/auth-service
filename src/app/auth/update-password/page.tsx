import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";
import { type EmailOtpType } from "@supabase/supabase-js";

export default async function Page(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;

  const tokenHash = typeof searchParams?.token_hash === "string" ? searchParams.token_hash : undefined;
  const type = typeof searchParams?.type === "string" ? searchParams.type as EmailOtpType : undefined;
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm tokenHash={tokenHash} type={type} />
      </div>
    </div>
  );
}
