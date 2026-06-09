"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ApplicationSummary = {
  isSubmitted?: boolean;
  status?: "pending" | "shortlisted" | "approved" | "rejected";
} | null;

function getApplicationState(application: ApplicationSummary) {
  if (!application) {
    return {
      label: "Draft",
      badge: "secondary" as const,
      progress: 20,
      action: "Start Application",
    };
  }

  if (!application.isSubmitted) {
    return {
      label: "Draft",
      badge: "secondary" as const,
      progress: 40,
      action: "Continue Application",
    };
  }

  if (application.status === "approved") {
    return {
      label: "Approved",
      badge: "default" as const,
      progress: 100,
      action: "View Status",
    };
  }

  if (application.status === "rejected") {
    return {
      label: "Rejected",
      badge: "destructive" as const,
      progress: 100,
      action: "View Status",
    };
  }

  return {
    label: "Under Review",
    badge: "outline" as const,
    progress: 75,
    action: "View Status",
  };
}

export default function PortalDashboardPage() {
  const [application, setApplication] = useState<ApplicationSummary>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadApplication() {
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

    loadApplication();

    return () => {
      mounted = false;
    };
  }, []);

  const state = useMemo(() => getApplicationState(application), [application]);
  const actionHref = state.action === "View Status" ? "/portal/status" : "/portal/application";

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Application overview</CardTitle>
              <CardDescription>
                Track your application journey and continue where you left off.
              </CardDescription>
            </div>
            <Badge variant={state.badge}>{loading ? "Loading" : state.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{loading ? 0 : state.progress}%</span>
            </div>
            <Progress value={loading ? 0 : state.progress} />
          </div>
          <Button asChild>
            <Link href={actionHref}>{state.action}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
