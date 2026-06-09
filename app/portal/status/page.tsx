"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatusResponse = {
  isSubmitted?: boolean;
  status?: "pending" | "shortlisted" | "approved" | "rejected";
  feedback?: string;
} | null;

function getStatus(application: StatusResponse) {
  if (!application) {
    return { label: "Draft", progress: 20, variant: "secondary" as const };
  }

  if (!application.isSubmitted) {
    return { label: "Draft", progress: 40, variant: "secondary" as const };
  }

  if (application.status === "approved") {
    return { label: "Approved", progress: 100, variant: "default" as const };
  }

  if (application.status === "rejected") {
    return { label: "Rejected", progress: 100, variant: "destructive" as const };
  }

  return { label: "Under Review", progress: 75, variant: "outline" as const };
}

export default function PortalStatusPage() {
  const [application, setApplication] = useState<StatusResponse>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/portal/application");
        if (!mounted) return;

        if (response.ok) {
          setApplication(await response.json());
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStatus();

    return () => {
      mounted = false;
    };
  }, []);

  const status = useMemo(() => getStatus(application), [application]);

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Status</CardTitle>
              <CardDescription>
                Current application progress and review state.
              </CardDescription>
            </div>
            <Badge variant={status.variant}>{loading ? "Loading" : status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={loading ? 0 : status.progress} />
          {application?.feedback && (
            <p className="text-muted-foreground text-sm">{application.feedback}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
