"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Analizar Comentario",
      href: "/",
      active: pathname === "/",
    },
    {
      name: "Analizar Video YouTube",
      href: "/youtube",
      active: pathname === "/youtube",
    },
  ];

  return (
    <nav className="flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            item.active
              ? "bg-red-100 text-red-700"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
