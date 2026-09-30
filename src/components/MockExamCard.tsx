"use client";

import { Clock, HelpCircle, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface MockExamItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  durationMins: number;
  totalQuestions: number;
  exam: {
    code: string;
    name: string;
    category: string;
    scoringType: string;
    badgeColor: string | null;
  };
  isPurchased?: boolean;
}

interface MockExamCardProps {
  exam?: MockExamItem;
  mock?: MockExamItem;
  onBuyClick?: (examId: string) => void;
}

export function MockExamCard({ exam, mock, onBuyClick }: MockExamCardProps) {
  const data = exam || mock;
  if (!data) return null;

  const isFree = (data.price ?? 0) <= 0;
  const badgeColor = data.exam?.badgeColor || "#3b82f6";
  const examCode = data.exam?.code || "GENEL";
  const examCategory = data.exam?.category === "NATIONAL" ? "ÖSYM / Ulusal" : "Uluslararası";

  return (
    <div className="bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/40 group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ 
              backgroundColor: `${badgeColor}20`, 
              color: badgeColor,
              border: `1px solid ${badgeColor}40`
            }}
          >
            {examCode}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {examCategory}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-100 text-base mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {data.description || "Gerçek sınav standartlarında süre kısıtlı ve detaylı karne analizli özgün deneme."}
        </p>
      </div>

      {/* Meta Specs & Action */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{data.durationMins || 120} Dakika</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{data.totalQuestions || 80} Soru</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Deneme Ücreti</div>
            <div className="text-lg font-black text-slate-100">
              {isFree ? (
                <span className="text-emerald-400">Ücretsiz</span>
              ) : (
                <>
                  {Number(data.price).toFixed(2)}{" "}
                  <span className="text-xs font-semibold text-slate-400">₺</span>
                </>
              )}
            </div>
          </div>

          {data.isPurchased ? (
            <Link
              href={`/exam/${data.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
            >
              <span>Sınava Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={() => onBuyClick?.(data.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-950 cursor-pointer"
            >
              <span>Satın Al</span>
              <span className="text-[10px] text-sky-200 opacity-80">(Paynkolay)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
