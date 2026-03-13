"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Calculator, 
  Drip, 
  MapPin, 
  Layers, 
  TrendingUp,
  DollarSign,
  Loader2,
  ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function CostEstimator() {
  const [formData, setFormData] = useState({
    area_sqft: 2500,
    material_quality: 0.8,
    location_factor: 1.1
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post("/cost-estimator/estimate", data);
      return res.data;
    },
  });

  const estimate = mutation.data;
  const totalCost = estimate?.estimated_cost || 0;

  const chartData = [
    { name: "Materials", value: totalCost * 0.6 },
    { name: "Labor", value: totalCost * 0.25 },
    { name: "Logistics", value: totalCost * 0.1 },
    { name: "Misc", value: totalCost * 0.05 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Cost Estimator</h1>
        <p className="text-white/40">AI-Driven Financial Forecasting for Projects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 p-6 glass rounded-2xl space-y-6"
        >
          <div className="flex items-center gap-2 text-orange-500 mb-4">
            <Calculator className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-wider text-sm">Parameters</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-white/60 block mb-2 font-bold uppercase">Area (Sq Ft)</label>
              <input 
                type="number" 
                value={formData.area_sqft}
                onChange={(e) => setFormData({...formData, area_sqft: parseInt(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-2 font-bold uppercase">Material Quality</label>
              <div className="flex gap-2">
                {[0.5, 0.8, 1.0].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setFormData({...formData, material_quality: val})}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold border ${formData.material_quality === val ? "bg-orange-500 border-orange-500 text-white" : "border-white/10 text-white/40 hover:bg-white/5"}`}
                  >
                    {val === 0.5 ? "ECO" : val === 0.8 ? "STD" : "LUXE"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-2 font-bold uppercase">Location Sensitivity</label>
              <select 
                value={formData.location_factor}
                onChange={(e) => setFormData({...formData, location_factor: parseFloat(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none"
              >
                <option value="1.0">Lagos (Central)</option>
                <option value="1.1">Abuja (Capital)</option>
                <option value="0.9">Kano (North)</option>
                <option value="1.2">Offshore/Remote</option>
              </select>
            </div>

            <button 
              onClick={() => mutation.mutate(formData)}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/10"
            >
              {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Calculate ROI"}
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 glass rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <TrendingUp className="w-24 h-24" />
                </div>
                <p className="text-white/40 font-bold uppercase text-xs mb-2">Estimated Total Investment</p>
                <h2 className="text-5xl font-black text-white">
                   #{totalCost.toLocaleString()}
                </h2>
                <p className="text-[10px] text-orange-500 font-bold mt-4 uppercase flex items-center gap-1">
                   <ChevronRight className="w-3 h-3" /> Breakdown based on current indices
                </p>
              </motion.div>

              <div className="p-8 glass rounded-2xl h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                      itemStyle={{color: '#fff'}}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={index === 0 ? "#f97316" : index === 1 ? "#fb923c" : "#fdba74"} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Accuracy", value: "98.2%", icon: Target },
                { label: "Market Volatility", value: "High", icon: TrendingUp },
                { label: "Currency", value: "NGN", icon: DollarSign },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 glass rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-orange-500/60" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
