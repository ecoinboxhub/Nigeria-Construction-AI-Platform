"use client";

import { motion } from "framer-motion";
import { 
  Wrench, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Timer, 
  Droplet,
  Thermometer,
  Zap
} from "lucide-react";

export default function MaintenancePredictor() {
  const assets = [
    { name: "Excavator #102", health: 92, status: "Optimal", nextChange: "450h", lastServiced: "Oct 12" },
    { name: "Tower Crane Alpha", health: 34, status: "Critical", nextChange: "12h", lastServiced: "Nov-01" },
    { name: "Concrete Mixer M-4", health: 76, status: "Monitor", nextChange: "112h", lastServiced: "Sep-28" },
    { name: "Generator Set 500kVA", health: 88, status: "Optimal", nextChange: "220h", lastServiced: "Oct-30" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Maintenance Predictor</h1>
          <p className="text-white/40">AI Asset Management & Failure Forecasting</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] font-bold text-white/40 uppercase">Fleet Health</p>
              <p className="text-xl font-black text-orange-500">84.5%</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-orange-500" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Asset Management */}
         <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Predictive Fleet Status</h2>
            <div className="space-y-3">
               {assets.map((asset, idx) => (
                 <motion.div 
                   key={asset.name}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="p-6 glass rounded-2xl border border-white/5 flex items-center justify-between"
                 >
                    <div className="flex items-center gap-6">
                       <div className={`w-3 h-12 rounded-full ${asset.health < 40 ? "bg-red-500" : asset.health < 80 ? "bg-orange-500" : "bg-green-500"}`} />
                       <div>
                          <h3 className="font-bold text-white">{asset.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-[10px] text-white/40 font-bold uppercase">
                             <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {asset.nextChange} left</span>
                             <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Svc: {asset.lastServiced}</span>
                          </div>
                       </div>
                    </div>

                    <div className="text-right">
                       <p className={`text-xl font-black ${asset.health < 40 ? "text-red-500" : asset.health < 80 ? "text-orange-500" : "text-green-500"}`}>{asset.health}%</p>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{asset.status}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Sensor Telemetry */}
         <div className="space-y-6">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Live Telemetry (Crane Alpha)</h2>
            <div className="p-8 glass rounded-2xl border border-white/5 space-y-8">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-white/40">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">Core Temp</span>
                     </div>
                     <p className="text-2xl font-black text-red-500">92°C</p>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-white/40">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">Vibration</span>
                     </div>
                     <p className="text-2xl font-black text-orange-500">8.4 G</p>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-white/40">
                        <Droplet className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">Oil Health</span>
                     </div>
                     <p className="text-2xl font-black text-green-500">Excellent</p>
                  </div>
               </div>

               <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-red-500">
                     <AlertTriangle className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase">Failure Prediction</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed italic">
                    &quot;High vibration detected in Alpha engine housing. AI predicts component failure within 15 operating hours. **Immediate maintenance recommended.**&quot;
                  </p>
               </div>

               <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-colors">
                  Create Service Ticket
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
