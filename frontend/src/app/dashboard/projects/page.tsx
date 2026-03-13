"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Target, 
  CloudRain, 
  Users, 
  Truck, 
  Percent, 
  AlertTriangle, 
  CheckCircle2,
  Loader2
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProjectTracker() {
  const [formData, setFormData] = useState({
    rainfall_mm: 5,
    resource_availability: 0.9,
    workforce_attendance: 0.85,
    supply_delay_days: 1
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post("/projects/predict-delay", data);
      return res.data;
    },
  });

  const prediction = mutation.data;
  const isDelayed = prediction?.prediction === 1;
  const probability = prediction?.probability || 0;

  const chartData = [
    { name: "Delay", value: probability },
    { name: "On Time", value: 1 - probability },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Project Tracker</h1>
        <p className="text-white/40">AI-Powered Construction Delay Prediction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 p-6 glass rounded-2xl space-y-6"
        >
          <div className="flex items-center gap-2 text-orange-500 mb-4">
            <Target className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-wider text-sm">Site Parameters</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/60 block mb-2">Rainfall (mm)</label>
              <div className="flex items-center gap-3">
                <CloudRain className="text-white/20 w-4 h-4" />
                <input 
                  type="range" min="0" max="100" 
                  value={formData.rainfall_mm}
                  onChange={(e) => setFormData({...formData, rainfall_mm: parseInt(e.target.value)})}
                  className="flex-1 accent-orange-500"
                />
                <span className="text-sm border border-white/10 px-2 rounded bg-white/5 w-12 text-center text-white">{formData.rainfall_mm}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-2">Resource Availability (%)</label>
              <div className="flex items-center gap-3">
                <Truck className="text-white/20 w-4 h-4" />
                <input 
                  type="range" min="0" max="1" step="0.01"
                  value={formData.resource_availability}
                  onChange={(e) => setFormData({...formData, resource_availability: parseFloat(e.target.value)})}
                  className="flex-1 accent-orange-500"
                />
                <span className="text-sm border border-white/10 px-2 rounded bg-white/5 w-12 text-center text-white">{Math.round(formData.resource_availability * 100)}%</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-2">Workforce Attendance (%)</label>
              <div className="flex items-center gap-3">
                <Users className="text-white/20 w-4 h-4" />
                <input 
                  type="range" min="0" max="1" step="0.01"
                  value={formData.workforce_attendance}
                  onChange={(e) => setFormData({...formData, workforce_attendance: parseFloat(e.target.value)})}
                  className="flex-1 accent-orange-500"
                />
                <span className="text-sm border border-white/10 px-2 rounded bg-white/5 w-12 text-center text-white">{Math.round(formData.workforce_attendance * 100)}%</span>
              </div>
            </div>

            <button 
              onClick={() => mutation.mutate(formData)}
              disabled={mutation.isPending}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all"
            >
              {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run AI Prediction"}
            </button>
          </div>
        </motion.div>

        {/* Prediction Results */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 glass rounded-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">AI Analysis</h2>
              <p className="text-white/40 text-sm">Real-time risk assessment results</p>
            </div>
            {prediction && (
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 border ${isDelayed ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-green-500/10 border-green-500/30 text-green-500"}`}>
                {isDelayed ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase">{isDelayed ? "High Delay Risk" : "On Track"}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 relative z-10">
            <div className="h-64 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%" cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={isDelayed ? "#ef4444" : "#22c55e"} />
                    <Cell fill="rgba(255,255,255,0.05)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                 <span className="text-2xl font-bold text-white">{Math.round(probability * 100)}%</span>
                 <p className="text-[10px] text-white/40 font-bold uppercase">Risk Score</p>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-white/40 mb-1 uppercase font-bold">Recommended Action</p>
                <p className="text-white text-sm">
                  {isDelayed 
                    ? "Increase workforce overtime or expedite material logistics immediately." 
                    : "Maintain current site pace. All parameters are within safe limits."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                   <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Confidence</p>
                   <p className="text-lg font-bold text-white">94%</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                   <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Latent Score</p>
                   <p className="text-lg font-bold text-white">0.22</p>
                </div>
              </div>
            </div>
          </div>

          {!prediction && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
               <div className="text-center group">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white/20" />
                 </div>
                 <p className="text-white/40 text-sm italic">Waiting for site parameters...</p>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
