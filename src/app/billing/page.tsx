"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Download,
  Building2,
  Lock
} from "lucide-react";

export default function BillingPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");

  const transactions = [
    {
      id: "tx-1",
      orderNo: "ORD-20260929-1084",
      studentName: "Merve Çelik",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      paymentMethod: "Paynkolay 3D (Mastercard ••4012)",
      status: "SUCCESS",
      date: "29 Eylül 2026, 21:14",
    },
    {
      id: "tx-2",
      orderNo: "ORD-20260929-1083",
      studentName: "Barış Demir",
      examTitle: "2026 YDS Master Plus Akademik Deneme #1",
      amount: 89.0,
      paymentMethod: "Paynkolay 3D (Visa ••9123)",
      status: "SUCCESS",
      date: "29 Eylül 2026, 18:32",
    },
    {
      id: "tx-3",
      orderNo: "ORD-20260928-1082",
      studentName: "Zeynep Kaya",
      examTitle: "IELTS Academic Band 7+ Reading Test Seti",
      amount: 49.0,
      paymentMethod: "Paynkolay 3D (Troy ••1188)",
      status: "SUCCESS",
      date: "28 Eylül 2026, 14:05",
    },
    {
      id: "tx-4",
      orderNo: "ORD-20260927-1081",
      studentName: "Caner Aydın",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      paymentMethod: "Paynkolay 3D (Visa ••7721)",
      status: "SUCCESS",
      date: "27 Eylül 2026, 11:20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] flex text-slate-100">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-100">Paynkolay & Finans</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Aktif Bank Sanal POS Bağlı
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Deneme satış gelirleriniz, hakedişleriniz ve 3D Secure işlem dökümleri
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-950 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Hakediş Talep Et</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Toplam Ciro (Bu Ay)</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">4.280,00 ₺</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Geçen aya göre +%34 artış</span>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Satılan Deneme Adedi</span>
              <CreditCard className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">58 Adet</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Ortalama sepet tutarı: 73,80 ₺
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Hesaba Aktarılabilir Bakiye</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">3.852,00 ₺</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Sonraki otomatik transfer: Çarşamba
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-100 text-sm">Son Paynkolay Satış İşlemleri</h3>
            <button className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>Fatura Raporu İndir</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-850/50 transition-colors text-xs"
              >
                <div className="col-span-4">
                  <div className="font-bold text-slate-100">{tx.examTitle}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Öğrenci: <strong className="text-slate-200">{tx.studentName}</strong> • {tx.orderNo}
                  </div>
                </div>

                <div className="col-span-3 text-slate-400">
                  <span className="block">{tx.paymentMethod}</span>
                  <span className="text-[11px] text-slate-500">{tx.date}</span>
                </div>

                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Onaylandı
                  </span>
                </div>

                <div className="col-span-3 text-right">
                  <div className="font-black text-sm text-slate-100">{tx.amount.toFixed(2)} ₺</div>
                  <div className="text-[10px] text-slate-500">Net Kazanç: {(tx.amount * 0.95).toFixed(2)} ₺</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
