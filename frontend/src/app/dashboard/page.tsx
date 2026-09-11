"use client";

import { Button } from "@/components/ui/button";
import { useDescope } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DashboardPage() {
  const sdk = useDescope();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await sdk.logout();
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      setLoggingOut(false);
    }
  }

  return (
    <div>
      DashboardPage
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default DashboardPage;
