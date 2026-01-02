import { SignupForm } from "@/components/SignupForm";

export default async function Page(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm error={error} />
      </div>
    </div>
  );
}
