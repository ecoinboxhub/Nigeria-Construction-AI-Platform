"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Target, 
  Calculator, 
  ShieldAlert, 
  Truck, 
  FileSearch, 
  FileText, 
  Eye, 
  Users, 
  Wrench, 
  Network 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const groups = [
  {
    name: "Project Intelligence",
    items: [
      { name: "Project Tracker", href: "/dashboard/projects", icon: Target },
      { name: "Cost Estimator", href: "/dashboard/cost", icon: Calculator },
      { name: "Tender Analyzer", href: "/dashboard/tender", icon: FileSearch },
    ]
  },
  {
    name: "Operations",
    items: [
      { name: "Workforce", href: "/dashboard/workforce", icon: Users },
      { name: "Procurement", href: "/dashboard/procurement", icon: Truck },
      { name: "Integrations", href: "/dashboard/integrations", icon: Network },
    ]
  },
  {
    name: "Compliance & Safety",
    items: [
      { name: "Safety Dashboard", href: "/dashboard/safety", icon: ShieldAlert },
      { name: "Progress Vision", href: "/dashboard/progress", icon: Eye },
      { name: "Document Analysis", href: "/dashboard/documents", icon: FileText },
      { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          NIGERIA-AI
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {groups.map((group) => (
          <div key={group.name} className="mb-8">
            <h2 className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              {group.name}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                    pathname === item.href 
                      ? "bg-orange-500/20 text-orange-500 border border-orange-500/30" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
