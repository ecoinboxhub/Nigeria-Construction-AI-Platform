"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Circle, User } from "lucide-react";

export default function Header() {
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        const res = await api.get("/health");
        return res.data;
      } catch {
        return { status: "offline" };
      }
    },
    refetchInterval: 10000, 
  });

  const isOnline = health?.status === "ok";

  return (
    <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <Circle className={`w-2 h-2 fill-current ${isOnline ? "text-green-500" : "text-red-500"}`} />
          <span className="text-xs font-medium text-white/60">
            {isOnline ? "AI SYSTEMS ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <User className="w-4 h-4 text-orange-500" />
        </div>
      </div>
    </header>
  );
}
