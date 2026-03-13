"use client";

import { motion } from "framer-motion";
import { 
  Network, 
  Zap, 
  ShieldCheck, 
  Database, 
  Globe, 
  RefreshCcw,
  Activity,
  ArrowRight
} from "lucide-react";

export default function IntegrationSuite() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Integration Suite</h1>
          <p className="text-white/40">Real-time Data Fabric & External API Management</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-orange-400 transition-all">
              <Zap className="w-4 h-4 fill-current" />
              Force Full Sync
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Live Connections */}
         <div className="md:col-span-2 space-y-6">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Active External Pipelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: "OpenWeather API", type: "Weather Hooks", latency: "42ms", status: "Connected", icon: Globe },
                 { name: "Aiven PostgreSQL", type: "Core Database", latency: "12ms", status: "Syncing", icon: Database },
                 { name: "Redis Labs", type: "Cache Layer", latency: "8ms", status: "Healthy", icon: Zap },
                 { name: "Nigeria Material Index", type: "Price Feed", latency: "310ms", status: "Active", icon: Activity },
               ].map((conn, idx) => (
                 <motion.div 
                   key={conn.name}
                   whileHover={{ scale: 1.02 }}
                   className="p-6 glass rounded-2xl border border-white/5 flex flex-col justify-between"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <conn.icon className="w-5 h-5 text-orange-500/60" />
                       </div>
                       <div className="text-right">
                          <span className="text-[10px] font-black text-green-500 uppercase flex items-center gap-1">
                             <ShieldCheck className="w-3 h-3" /> {conn.status}
                          </span>
                       </div>
                    </div>
                    <div>
                       <h3 className="font-bold text-white">{conn.name}</h3>
                       <p className="text-[10px] text-white/40 uppercase font-black mb-4">{conn.type}</p>
                       <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-white/20">Latency</span>
                          <span className="text-orange-500">{conn.latency}</span>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>

            <div className="p-8 glass rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-bold text-white">System Flow Topology</h3>
                   <RefreshCcw className="w-4 h-4 text-white/20 animate-spin-slow" />
                </div>
                <div className="h-48 flex items-center justify-around">
                   <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 flex items-center justify-center bg-orange-500/5">
                         <Globe className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-[8px] font-black text-white/40 uppercase">External APIs</span>
                   </div>
                   <ArrowRight className="w-6 h-6 text-white/10" />
                   <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                         <Zap className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-tighter">AI Core (Render)</span>
                   </div>
                   <ArrowRight className="w-6 h-6 text-white/10" />
                   <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 flex items-center justify-center bg-orange-500/5">
                         <Database className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-[8px] font-black text-white/40 uppercase">Data Lake</span>
                   </div>
                </div>
            </div>
         </div>

         {/* Integration Controls */}
         <div className="space-y-6">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Sync Log</h2>
            <div className="p-6 glass rounded-2xl border border-white/5 h-[calc(100%-2rem)] overflow-y-auto font-mono text-[10px] space-y-3">
               {[
                 "[09:42] FETCH: OpenWeather Current Lagos",
                 "[09:42] CACHE: Updating Redis Material Keys",
                 "[09:43] DB: Committing Audit Logs to Aiven",
                 "[09:44] WARN: Juju Index Latency > 2s",
                 "[09:45] SYSTEM: Heartbeat OK",
               ].map((log, i) => (
                 <div key={i} className="text-white/40 border-l border-white/10 pl-3">
                    <span className={log.includes("WARN") ? "text-red-500" : "text-orange-500"}>{log}</span>
                 </div>
               ))}
               <div className="p-4 bg-white/5 rounded-xl mt-8">
                  <p className="text-[10px] text-white/60 font-black uppercase mb-2">Bridge Configuration</p>
                  <p className="text-[8px] text-white/30 leading-relaxed italic">
                    &quot;External data is synchronized every 15 minutes to save API quotas while maintaining AI model accuracy.&quot;
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
