"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Sparkles, ArrowRight } from "lucide-react";

interface PdfStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToStudio?: (data: { examCode: string; fileName: string }) => void;
}

export function PdfStudioModal({ isOpen, onClose, onProceedToStudio }: PdfStudioModalProps) {
  const [selectedExam, setSelectedExam] = useState("YDT");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      onProceedToStudio?.({
        examCode: selectedExam,
        fileName: file?.name || "2026_YDT_Ozgün_Deneme_1.pdf",
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-slate-700/80 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-lg">AI Deneme Stüdyosu</h3>
            <p className="text-xs text-slate-400">PDF yükleyin, AI saniyeler içinde interaktif denemeye dönüştürsün.</p>
          </div>
        </div>

        {/* Exam Selection */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Hedef Sınav Türü
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { code: "YDT", label: "YDT (YKS-Dil)" },
              { code: "YDS", label: "YDS" },
              { code: "YOKDIL", label: "YÖKDİL" },
              { code: "IELTS_ACAD", label: "IELTS" },
              { code: "TOEFL_IBT", label: "TOEFL" },
              { code: "DET", label: "Duolingo" },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedExam(item.code)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedExam === item.code
                    ? "bg-sky-600 border-sky-400 text-white shadow-sm"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dropzone */}
        <div className="mb-6">
          <div
            onClick={() => {
              // Simulated file pick
              const mockFile = new File(["dummy content"], "2026_İngilizce_Özgün_Deneme.pdf", { type: "application/pdf" });
              setFile(mockFile);
            }}
            className="border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/40 transition-all group"
          >
            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <div className="text-sm font-bold text-slate-200 mb-1">
              {file ? file.name : "Sınav PDF'ini buraya bırakın veya tıklayın"}
            </div>
            <p className="text-[11px] text-slate-400">
              {file ? "Dosya seçildi. AI ayrıştırmaya hazır." : "PDF, Word veya taranmış sınav kitapçıkları desteklenir (Maks. 50 MB)"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200"
          >
            İptal
          </button>
          <button
            onClick={handleSimulatedUpload}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-950 transition-all"
          >
            {isProcessing ? (
              <span>Yapay Zeka Soruları Çıkarıyor...</span>
            ) : (
              <>
                <span>Stüdyoda Ayrıştır</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
