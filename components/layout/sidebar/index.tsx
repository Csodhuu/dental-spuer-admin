"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ClipboardCheck, LayoutDashboard, Users2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MainSidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(pathname);

  const menuItems = [
    {
      id: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "/hospitals",
      label: "hospitals",
      icon: ClipboardCheck,
      href: "/hospitals",
    },
    {
      id: "/system-users",
      label: "system-users",
      icon: Users2,
      href: "/system-users",
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r shadow-lg">
      <SidebarHeader className="h-16 px-4 border-b flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-2">
            A
          </div>
          <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
            Admin
          </span>
        </Link>
        <MobileCloseButton />
      </SidebarHeader>
      <SidebarContent className="px-3 py-4 ">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={activeItem === item.href}
                onClick={() => setActiveItem(item.href)}
                tooltip={item.label}
                className={cn(
                  "text-sm font-medium",
                  activeItem === item.href
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function MobileCloseButton() {
  const { setOpenMobile } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpenMobile(false)}
      className="lg:hidden"
    >
      <X className="h-5 w-5" />
    </Button>
  );
}
