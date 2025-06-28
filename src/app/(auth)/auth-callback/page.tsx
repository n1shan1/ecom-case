"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getAuthStatus } from "../_actions/get-auth-status";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {};

function AuthPage({}: Props) {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) {
      setConfigId(configurationId);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback", configId],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 1000,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-primary" />
        <h3 className="font-semibold text-xl">Logging You in.</h3>
        <p className="text-foreground">
          You will be redirected automatically...
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
