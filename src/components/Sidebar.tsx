"use client";
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Pacientes", href: "/pacientes" },
  { label: "Internações", href: "/internacoes" },
  { label: "Registros", href: "/registros" },
  { label: "Financeiro", href: "/financeiro" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-gray-50 shadow h-full min-h-screen w-56 p-4 flex flex-col gap-4 fixed left-0 z-40 border-r border-gray-200">
      <nav className="flex flex-col gap-2 mt-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-2 py-1 rounded font-medium ${pathname === link.href ? "bg-gray-200 text-blue-700" : "text-gray-700 hover:text-blue-700"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
