"use client";

import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  Package, 
  Search, 
  ExternalLink, 
  Star,
  ShieldCheck,
  TrendingDown
} from "lucide-react";

const suppliers = [
  { name: "Dangote Cement PLC", location: "Lagos, NG", rating: 4.8, category: "Cement", score: 94 },
  { name: "Bua Group Materials", location: "Kano, NG", rating: 4.7, category: "Aggregate", score: 91 },
  { name: "Julius Berger Logistics", location: "Abuja, NG", rating: 4.9, category: "Equipment", score: 88 },
  { name: "Standard Steels NG", location: "Enugu, NG", rating: 4.5, category: "Steel", score: 82 },
];

export default function ProcurementAssistant() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Procurement Assistant</h1>
          <p className="text-white/40">Market Intelligence & Supplier Risk Scoring</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold text-white/80">Market Index: -2.4%</span>
           </div>
        </div>
      </div>

      <div className="relative group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-500 transition-colors" />
         <input 
           type="text" 
           placeholder="Search for materials, suppliers, or logistics routes..."
           className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all font-medium"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Vetted Suppliers (Nigeria-AI Certified)</h2>
            <div className="space-y-3">
               {suppliers.map((s, idx) => (
                 <motion.div 
                   key={s.name}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className="p-6 glass rounded-2xl border border-white/5 flex items-center justify-between hover:border-orange-500/20 transition-all cursor-pointer group"
                 >
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                         <Package className="w-6 h-6 text-white/20" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                           <h3 className="font-bold text-white text-lg">{s.name}</h3>
                           <ShieldCheck className="w-4 h-4 text-blue-500" />
                         </div>
                         <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</span>
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {s.rating}</span>
                            <span className="bg-white/5 px-2 py-0.5 rounded uppercase font-bold text-[8px] tracking-widest text-white/60">{s.category}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-8">
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-white/40 uppercase">Reliability</p>
                         <p className={`text-xl font-black ${s.score > 90 ? "text-green-500" : "text-orange-500"}`}>{s.score}%</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                         <ExternalLink className="w-5 h-5 text-white/40" />
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest">Pricing Trends</h2>
            <div className="p-6 glass rounded-2xl border border-white/5 space-y-6">
               {[
                 { item: "Cement (50Kg)", price: "₦8,500", trend: "+12%" },
                 { item: "Reinforcement Steel (Ton)", price: "₦1,200,000", trend: "-5%" },
                 { item: "Sand (Triaxial)", price: "₦45,000", trend: "0%" },
               ].map((t, idx) => (
                 <div key={idx} className="flex justify-between items-center bg-white/3 p-3 rounded-xl">
                    <div>
                       <p className="text-[10px] font-bold text-white/40 uppercase">{t.item}</p>
                       <p className="text-sm font-bold text-white">{t.price}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded ${t.trend.startsWith("+") ? "bg-red-500/10 text-red-500" : t.trend.startsWith("-") ? "bg-green-500/10 text-green-500" : "bg-white/10 text-white/40"}`}>
                       {t.trend}
                    </span>
                 </div>
               ))}
               <div className="pt-4 border-t border-white/5">
                  <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-colors">
                     View All Market Rates
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
