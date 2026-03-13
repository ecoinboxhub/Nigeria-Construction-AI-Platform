"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Camera, 
  HardHat, 
  Clock,
  ExternalLink
} from "lucide-react";

const violations = [
  { id: 1, type: "No Hard Hat", location: "Sector 4-B", severity: "High", time: "2m ago", status: "Active" },
  { id: 2, type: "Restricted Area", location: "Excavation Pit", severity: "Critical", time: "15m ago", status: "Alerted" },
  { id: 3, type: "Correct PPE", location: "Assembly Area", severity: "Normal", time: "1h ago", status: "Resolved" },
];

export default function SafetyDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Safety Dashboard</h1>
          <p className="text-white/40">Real-time Computer Vision Safety Monitoring</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-red-500 animate-pulse">
           <Activity className="w-4 h-4" />
           <span className="text-xs font-bold uppercase">Live Vision Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Hazards", value: "24", icon: AlertTriangle, color: "text-orange-500" },
          { label: "Active Violations", value: "02", icon: ShieldAlert, color: "text-red-500" },
          { label: "Safe Operations", value: "98%", icon: CheckCircle2, color: "text-green-500" },
          { label: "Camera Feeds", value: "08", icon: Camera, color: "text-blue-500" },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="p-6 glass rounded-2xl border border-white/5 space-y-4"
          >
            <div className={`p-2 w-fit rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase">{stat.label}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Violation List */}
        <div className="lg:col-span-2 space-y-4">
           <h2 className="text-lg font-bold text-white flex items-center gap-2">
             <ShieldAlert className="w-5 h-5 text-red-500" />
             Recent Safety Events
           </h2>
           <div className="space-y-3">
             {violations.map((v, idx) => (
               <motion.div 
                 key={v.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="p-4 glass rounded-xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer"
               >
                 <div className="flex items-center gap-4">
                   <div className={`w-2 h-10 rounded-full ${v.severity === "Critical" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : v.severity === "High" ? "bg-orange-500" : "bg-green-500 opacity-20"}`} />
                   <div>
                     <p className="text-sm font-bold text-white">{v.type}</p>
                     <p className="text-[10px] text-white/40 uppercase font-medium">{v.location} • {v.time}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 text-xs font-bold">
                    <span className={v.severity === "Critical" ? "text-red-500" : "text-white/40"}>{v.severity}</span>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                       <ExternalLink className="w-4 h-4 text-white/20" />
                    </button>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        {/* Vision Insights */}
        <div className="space-y-6">
           <h2 className="text-lg font-bold text-white flex items-center gap-2">
             <Activity className="w-5 h-5 text-orange-500" />
             AI Confidence Scores
           </h2>
           <div className="p-6 glass rounded-2xl border border-white/5 space-y-6">
              {[
                { label: "PPE Detection", score: 99.2 },
                { label: "Fall Risk Analysis", score: 87.5 },
                { label: "Heavy Machinery Tracking", score: 94.1 },
                { label: "Zonal Incursion Detection", score: 96.8 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-white/60">{item.label}</span>
                    <span className="text-orange-500">{item.score}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                    />
                  </div>
                </div>
              ))}
              <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 mt-4">
                 <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Safety Tip</p>
                 <p className="text-xs text-white/60 leading-relaxed italic">
                   &quot;AI models detected a decrease in PPE compliance during shift changes. Recommend automated reminder on site speakers.&quot;
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
