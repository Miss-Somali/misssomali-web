"use client";

import { cn } from "../../utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarProps = {
  navigation: NavItem[];
};

export function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-width duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href="/"
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <div className="relative w-36 h-8">
                <Image
                  src="/logo.png"
                  alt="Miss Somali Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  className="dark:invert"
                  priority
                />
              </div>
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            <div className="mb-6">
              <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                Navigation
              </h2>

              <nav role="navigation" aria-label="Main navigation links">
                <ul className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                      <li key={item.name}>
                        <MenuItem
                          as="link"
                          href={item.href}
                          isActive={isActive}
                          className="flex items-center gap-3 py-3"
                        >
                          <item.icon
                            className={cn(
                              "size-6 shrink-0 transition-colors",
                              isActive ? "text-primary dark:text-white" : "text-current",
                            )}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-semibold">{item.name}</span>
                        </MenuItem>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
