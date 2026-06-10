"use client";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "./sidebar/sidebar-context";

type DashboardShellProps = {
  children: React.ReactNode;
  routePrefix: "/admin" | "/portal";
  user: {
    name: string;
    email: string;
    image?: string;
  };
  profileUrl: string;
  settingsUrl: string;
  onSignOut: () => void;
};

export function DashboardShell({
  children,
  routePrefix,
  user,
  profileUrl,
  settingsUrl,
  onSignOut,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar routePrefix={routePrefix} />

        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header
            user={user}
            onSignOut={onSignOut}
            profileUrl={profileUrl}
            settingsUrl={settingsUrl}
          />

          <main className="isolate mx-auto w-full max-w-(--breakpoint-2xl) overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
