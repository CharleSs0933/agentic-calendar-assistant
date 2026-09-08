"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();

  return (
    <div className="descope-wrap">
      <Descope
        flowId="sign-up-or-in"
        autoFocus="skipFirstScreen"
        redirectAfterSuccess="/dashboard"
        onSuccess={() => router.replace("/dashboard")}
        onError={(error) => console.error("Sign in failed", error.detail)}
      />
    </div>
  );
}

export default SignIn;
