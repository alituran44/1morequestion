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
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Paynkolay & Finans</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Aktif Bank Sanal POS Bağlı
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Deneme satış gelirleriniz, hakedişleriniz ve 3D Secure işlem dökümleri
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-2 cursor-pointer">
            <Building2 className="w-4 h-4" />
            <span>Hakediş Talep Et</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Toplam Ciro (Bu Ay)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">4.280,00 ₺</div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Geçen aya göre +%34 artış</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Satılan Deneme Adedi</span>
              <CreditCard className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">58 Adet</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Ortalama sepet tutarı: 73,80 ₺
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Hesaba Aktarılabilir Bakiye</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">3.852,00 ₺</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Sonraki otomatik transfer: Çarşamba
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">Son Paynkolay Satış İşlemleri</h3>
            <button className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Fatura Raporu İndir</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/80 transition-colors text-xs"
              >
                <div className="col-span-4">
                  <div className="font-bold text-slate-900">{tx.examTitle}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Öğrenci: <strong className="text-slate-800">{tx.studentName}</strong> • {tx.orderNo}
                  </div>
                </div>

                <div className="col-span-3 text-slate-600">
                  <span className="block">{tx.paymentMethod}</span>
                  <span className="text-[11px] text-slate-400">{tx.date}</span>
                </div>

                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Onaylandı
                  </span>
                </div>

                <div className="col-span-3 text-right">
                  <div className="font-black text-sm text-slate-900">{tx.amount.toFixed(2)} ₺</div>
                  <div className="text-[10px] text-slate-400">Net Kazanç: {(tx.amount * 0.95).toFixed(2)} ₺</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
