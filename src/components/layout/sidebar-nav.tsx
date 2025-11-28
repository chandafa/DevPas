'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  MessageSquare,
  Shield,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Briefcase,
} from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const memberNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/events', label: 'Events', icon: CalendarDays },
  { href: '/dashboard/forum', label: 'Forum', icon: MessageSquare },
];

const managerNav = [
    { href: '/dashboard/manager', label: 'Manager Panel', icon: Briefcase },
    { href: '/dashboard/manager/events', label: 'Manage Events', icon: CalendarDays },
];

const adminNav = [{ href: '/dashboard/admin', label: 'Admin Panel', icon: Shield }];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Icons.logo className="size-7 shrink-0" />
          <div className="flex flex-1-col grow-0 overflow-hidden text-lg font-bold">
            DevPas
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {/* Member Navigation */}
          {memberNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* Manager Navigation */}
          {(isAdmin || isManager) && (
            <Collapsible>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Pengelola">
                            <Briefcase />
                            <span>Pengelola</span>
                            <ChevronDown className="ml-auto size-4 shrink-0 transition-transform ease-in-out group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {managerNav.map(item => (
                             <SidebarMenuItem key={item.href}>
                                <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                                    <Link href={item.href}>
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                             </SidebarMenuItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
          )}

          {/* Admin Navigation */}
          {isAdmin && (
          <Collapsible>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Admin">
                        <Shield />
                        <span>Admin</span>
                        <ChevronDown className="ml-auto size-4 shrink-0 transition-transform ease-in-out group-data-[state=open]:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {adminNav.map(item => (
                         <SidebarMenuItem key={item.href}>
                            <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                                <Link href={item.href}>
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuSubButton>
                         </SidebarMenuItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          )}

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/dashboard/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Log Out">
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {user && (
          <div className="flex items-center gap-3 rounded-md border p-2">
            <Avatar className="size-8">
              <AvatarImage src={user.image || user.photoURL || ''} />
              <AvatarFallback>{user.name?.[0] || user.email?.[0]}</AvatarFallback>
            </Avatar>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                state === 'collapsed' ? 'w-0' : 'w-full'
              }`}
            >
              <p className="truncate text-sm font-semibold">{user.name || user.email}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </>
  );
}
