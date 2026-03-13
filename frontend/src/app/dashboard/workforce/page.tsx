"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Map, 
  Clock, 
  BrainCircuit,
  Maximize2
} from "lucide-react";

export default function WorkforceScheduler() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workforce Scheduler</h1>
          <p className="text-white/40">Reinforcement Learning for Shift Optimization</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-500">
           <BrainCircuit className="w-4 h-4" />
           <span className="text-xs font-bold uppercase">AI Planner Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Statistics */}
        <div className="lg:col-span-1 space-y-6">
           {[
             { label: "Active Workers", value: "142", icon: Users },
             { label: "Current Shifts", value: "03", icon: Clock },
             { label: "Optimization Score", value: "96.4%", icon: BrainCircuit },
           ].map((stat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="p-6 glass rounded-2xl border border-white/5"
             >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <stat.icon className="w-5 h-5 text-orange-500/60" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">{stat.label}</p>
                    <p className="text-xl font-black text-white">{stat.value}</p>
                  </div>
                </div>
             </motion.div>
           ))}

           <div className="p-6 glass rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 py-12">
              <Calendar className="w-10 h-10 text-white/10" />
              <button className="text-sm font-bold text-orange-500 hover:text-orange-400">Generate Next Week&apos;s Shift Plan</button>
           </div>
        </div>

        {/* Schedule View */}
        <div className="lg:col-span-3 space-y-6">
           <div className="p-8 glass rounded-2xl border border-white/5 min-h-[600px]">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <Map className="w-5 h-5 text-orange-500" />
                    Resource Allocation Map
                 </h2>
                 <div className="flex gap-2">
                    {['24H', '7D', '30D'].map(t => (
                      <button key={t} className="px-3 py-1 rounded-lg text-[10px] font-bold border border-white/10 text-white/40 hover:text-white transition-colors uppercase">{t}</button>
                    ))}
                 </div>
              </div>

              {/* Mock Timeline */}
              <div className="space-y-6">
                 {[
                   { site: "Eko Atlantic Phase 2", crew: "Alpha (Civil)", load: 85, color: "bg-orange-500" },
                   { site: "Abuja Mall Expansion", crew: "Beta (Electrical)", load: 42, color: "bg-blue-500" },
                   { site: "Port Harcourt Bridge", crew: "Gamma (Welding)", load: 92, color: "bg-red-500" },
                   { site: "Lekki Residential", crew: "Delta (Finishing)", load: 68, color: "bg-green-500" },
                 ].map((job, idx) => (
                   <div key={idx} className="space-y-3">
                      <div className="flex justify-between items-center pr-4">
                         <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">{job.site}</span>
                            <span className="text-[10px] uppercase font-bold text-white/30">{job.crew}</span>
                         </div>
                         <span className="text-xs font-bold text-white/60">{job.load}% Load</span>
                      </div>
                      <div className="h-10 bg-white/5 rounded-xl border border-white/5 relative group overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${job.load}%` }}
                           transition={{ duration: 1.5, type: "spring" }}
                           className={`h-full ${job.color} opacity-20 border-r-2 border-${job.color.split('-')[1]}-500/50 relative`}
                         >
                            <div className="absolute inset-0 bg-grid-construction bg-[size:10px_10px]" />
                         </motion.div>
                         <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-4 h-4 text-white/20 hover:text-white" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-12 p-6 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-4">
                 <div className="p-2 bg-orange-500/20 rounded-lg shrink-0">
                    <Briefcase className="w-5 h-5 text-orange-500" />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-1 font-black">AI Recommendations</h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      &quot;RL Model suggests re-routing 4 workers from &apos;Abuja Mall&apos; to &apos;Port Harcourt Bridge&apos; for the night shift to mitigate the predicted 15-hour bottleneck caused by recent rainfall.&quot;
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
