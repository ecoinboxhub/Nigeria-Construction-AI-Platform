"use client";

import { motion } from "framer-motion";
import { 
  Eye, 
  Layers, 
  Map, 
  Maximize2, 
  BarChart3, 
  RefreshCcw,
  Activity,
  Play
} from "lucide-react";

export default function ProgressVisualizer() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Progress Visualizer</h1>
          <p className="text-white/40">3D BIM Mapping & Computer Vision Integration</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-all">
              <RefreshCcw className="w-4 h-4" />
              Sync BIM Data
           </button>
           <button className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-orange-400 transition-all">
              <Play className="w-4 h-4 fill-current" />
              Run Scan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Live Feeds */}
         <div className="lg:col-span-3 space-y-6">
            <div className="aspect-video glass rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
               
               {/* 3D Wireframe Overlay */}
               <div className="absolute inset-0 bg-grid-construction opacity-20 pointer-events-none" />
               
               {/* AI Detected Objects */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute top-1/4 left-1/3 w-32 h-24 border-2 border-orange-500 rounded-lg flex flex-col justify-end p-2"
               >
                  <span className="text-[10px] bg-orange-500 text-white font-black px-1 rounded w-fit absolute -top-4 -left-[2px]">Concrete Slab (94%)</span>
               </motion.div>

               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white z-10">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                        <Activity className="w-5 h-5 text-orange-500" />
                     </div>
                     <div>
                        <p className="font-bold text-sm">Site Entrance A-1</p>
                        <p className="text-[10px] text-white/60 uppercase font-black">Live Stream • 0.2s Latency</p>
                     </div>
                  </div>
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:scale-110 transition-transform">
                     <Maximize2 className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 glass rounded-2xl border border-white/5">
                   <h3 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                     <Layers className="w-4 h-4 text-orange-500" />
                     BIM vs Actual Offset
                   </h3>
                   <div className="flex items-center gap-8">
                      <div className="text-center">
                         <p className="text-2xl font-black text-white">-4.2cm</p>
                         <p className="text-[10px] text-red-500 font-bold uppercase">Vertical Dev</p>
                      </div>
                      <div className="text-center">
                         <p className="text-2xl font-black text-white">+0.8cm</p>
                         <p className="text-[10px] text-green-500 font-bold uppercase">Alignment</p>
                      </div>
                   </div>
                </div>
                <div className="p-6 glass rounded-2xl border border-white/5">
                   <h3 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                     <BarChart3 className="w-4 h-4 text-orange-500" />
                     Completion Timeline
                   </h3>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                      <div className="h-full bg-orange-500 w-3/4" />
                      <div className="h-full bg-white/10 w-1/4" />
                   </div>
                   <div className="mt-2 flex justify-between text-[10px] font-bold">
                      <span className="text-white/40 uppercase">Phase 1: Foundation</span>
                      <span className="text-orange-500">75% Complete</span>
                   </div>
                </div>
            </div>
         </div>

         {/* Site Map Side */}
         <div className="space-y-6">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Site Overview</h2>
            <div className="aspect-square glass rounded-3xl border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-construction opacity-40 p-12">
                  <div className="w-full h-full relative">
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1] }} 
                       title="Computer Vision analysis confirms 92% adherence to BIM blueprint. 0 critical structural deviations detected since last flight."
                     className="absolute left-1/4 top-1/2 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]" 
                     />
                     <div className="absolute left-3/4 top-1/4 w-3 h-3 bg-blue-500 rounded-full opacity-40" />
                     <div className="absolute left-1/2 top-1/3 w-3 h-3 bg-red-500 rounded-full opacity-40" />
                  </div>
               </div>
               <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-3">
                     <Map className="w-4 h-4 text-orange-500" />
                     <span className="text-xs font-bold text-white/80 uppercase">Satellite Overlay</span>
                  </div>
               </div>
            </div>

            <div className="p-6 glass rounded-2xl border border-white/5 space-y-4">
               <h3 className="text-[10px] font-bold text-white/40 uppercase">Layer Selection</h3>
               <div className="space-y-2">
                  {["Blueprint Layout", "Structural Steel", "HVAC Systems", "Electrical Grid"].map((layer, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                       <span className="text-xs text-white/60 font-medium">{layer}</span>
                       <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-orange-500 border-orange-500" : "border-white/20"}`} />
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
