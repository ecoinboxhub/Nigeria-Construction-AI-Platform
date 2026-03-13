"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Hash,
  Filter,
  FileSearch,
  ExternalLink
} from "lucide-react";

const documents = [
  { id: "DOC-9921", name: "Structural Integrity Report.pdf", type: "Inspection", date: "Today, 10:45", status: "Analyzed", risk: "Low" },
  { id: "DOC-9845", name: "Lagos Waterfront Foundation.dwg", type: "Blueprint", date: "Yesterday", status: "Processing", risk: "N/A" },
  { id: "DOC-9712", name: "Quality Assurance Cert.pdf", type: "Compliance", date: "3 days ago", status: "Flagged", risk: "High" },
  { id: "DOC-9654", name: "Health & Safety Protocol.docx", type: "Manual", date: "1 week ago", status: "Analyzed", risk: "None" },
];

export default function DocumentAnalyzer() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Document Analysis</h1>
          <p className="text-white/40">AI OCR & Semantic Intelligence Repository</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-white/80">3,421 Indexed Docs</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* AI Search & Filter */}
         <div className="lg:col-span-1 space-y-6">
            <div className="p-6 glass rounded-2xl border border-white/5 space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase pl-1">Semantic Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="text" 
                      placeholder="Ask about materials..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-9 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    />
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase pl-1 flex items-center gap-2">
                     <Filter className="w-3 h-3" /> Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                     {["Blueprints", "Contracts", "Reports", "Compliance"].map(f => (
                       <button key={f} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase">
                          {f}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                  <p className="text-[10px] text-orange-500 font-bold uppercase mb-2">AI Summary Tip</p>
                  <p className="text-xs text-white/60 italic leading-relaxed">
                    &quot;Search for &apos;Lagos concrete fatigue&apos; to find all structural test reports from the last quarter.&quot;
                  </p>
               </div>
            </div>

            <div className="p-8 glass rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group hover:border-orange-500/20 transition-all">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-orange-500/10 transition-all">
                  <Hash className="w-6 h-6 text-white/20 group-hover:text-orange-500" />
               </div>
               <p className="text-xs font-bold text-white/60">Upload & Vectorize</p>
            </div>
         </div>

         {/* Document List */}
         <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center mb-2 px-1">
               <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Recent Intelligence Scans</h2>
               <button className="text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase">View All Index</button>
            </div>
            
            <div className="space-y-3">
               {documents.map((doc, idx) => (
                 <motion.div 
                   key={doc.id}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className="p-5 glass rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-all cursor-pointer group"
                 >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white/20" />
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-0.5">
                             <h3 className="font-bold text-white">{doc.name}</h3>
                             <span className="text-[8px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded uppercase tracking-tighter">{doc.id}</span>
                          </div>
                          <p className="text-[10px] text-white/30 font-medium uppercase">{doc.type} • Indexed {doc.date}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-8">
                       <div className="flex items-center gap-12">
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-white/40 uppercase">AI Status</p>
                             <div className="flex items-center gap-1.5 justify-end">
                                {doc.status === "Flagged" ? <AlertCircle className="w-3 h-3 text-red-500" /> : doc.status === "Processing" ? <Clock className="w-3 h-3 text-orange-500 animate-pulse" /> : <CheckCircle className="w-3 h-3 text-green-500" />}
                                <span className={`text-xs font-bold ${doc.status === "Flagged" ? "text-red-500" : doc.status === "Processing" ? "text-orange-500" : "text-white/60"}`}>{doc.status}</span>
                             </div>
                          </div>
                          <div className="text-right w-16">
                             <p className="text-[10px] font-bold text-white/40 uppercase font-black">Risk</p>
                             <p className={`text-xs font-bold ${doc.risk === "High" ? "text-red-500" : "text-white/40"}`}>{doc.risk}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white transition-all">
                             <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white transition-all">
                             <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
