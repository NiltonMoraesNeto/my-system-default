"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  Sun,
  Moon,
  Settings,
  ChevronDown,
} from "lucide-react";
import { logout } from "@/services/login";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Perfil", href: "/perfil" },
  {
    icon: Settings,
    label: "Configurações",
    href: "/configuracoes",
    submenu: [
      { icon: User, label: "Conta", href: "/configuracoes/conta" },
      {
        icon: Settings,
        label: "Preferências",
        href: "/configuracoes/preferencias",
      },
    ],
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getThemeIcon = () => {
    return theme === "light" ? <Moon size={24} /> : <Sun size={24} />;
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenu === item.label;

    return (
      <li key={item.label}>
        <Link
          href={item.href}
          className={`flex items-center p-2 hover:bg-accent rounded transition-all duration-300 ${
            isOpen ? "justify-start" : "justify-center"
          } ${isActive ? "bg-accent" : ""}`}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault();
              toggleSubmenu(item.label);
            }
          }}
        >
          <item.icon size={24} />
          {isOpen && (
            <>
              <span className="ml-2">{item.label}</span>
              {hasSubmenu && (
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-200 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </>
          )}
        </Link>
        {hasSubmenu && isOpen && isSubmenuOpen && (
          <ul className="ml-6 mt-2 space-y-2">
            {item.submenu!.map((subItem) => (
              <li key={subItem.label}>
                <Link
                  href={subItem.href}
                  className={`flex items-center p-2 hover:bg-accent rounded ${
                    pathname === subItem.href ? "bg-accent" : ""
                  }`}
                >
                  <subItem.icon size={20} />
                  <span className="ml-2">{subItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={`
      fixed top-0 left-0 z-40 h-screen
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}
      bg-background border-r
    `}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <span
            className={`text-xl font-semibold transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-accent"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">{menuItems.map(renderMenuItem)}</ul>
        </nav>
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className={`w-full transition-all duration-300 ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            {getThemeIcon()}
            <span
              className={`ml-2 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </span>
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`w-full transition-all duration-300 ${
              isOpen ? "flex items-center justify-center" : "p-2"
            }`}
          >
            <LogOut size={24} />
            <span
              className={`ml-2 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              Sair
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
