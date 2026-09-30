"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  DollarSign, 
  Sparkles, 
  ArrowLeft, 
  RefreshCw, 
  Shield, 
  Zap,
  BarChart2,
  Lock,
  KeyRound,
  LogOut,
  ChevronRight,
  Check,
  Building2,
  Activity
} from "lucide-react";

interface AdminExamItem {
  id: string;
  title: string;
  examCode: string;
  author: string;
  price: number;
  questionCount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  submittedDate: string;
  salesCount: number;
}

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  solvedMocks: number;
}

interface AdminTransactionItem {
  id: string;
  orderNumber: string;
  merchantOid: string;
  userName: string;
  examTitle: string;
  amount: number;
  platformShare: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  date: string;
}

export default function AdminPage() {
  // 1. Separate Admin Gate / Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("admin@1morequiz.com");
  const [loginPassword, setLoginPassword] = useState("••••••••");
  const [loginError, setLoginError] = useState("");

  // 2. Admin Dashboard State
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "EXAMS" | "USERS" | "FINANCE" | "SYSTEM">("OVERVIEW");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock Data
  const [exams, setExams] = useState<AdminExamItem[]>([
    {
      id: "ex-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      examCode: "YDT",
      author: "Ahmet Hoca (ELT)",
      price: 69.0,
      questionCount: 80,
      status: "APPROVED",
      submittedDate: "28 Eylül 2026",
      salesCount: 142,
    },
    {
      id: "ex-2",
      title: "2026 YDS Master Akademik Paragraf & Çeviri",
      examCode: "YDS",
      author: "Ahmet Hoca (ELT)",
      price: 89.0,
      questionCount: 80,
      status: "APPROVED",
      submittedDate: "25 Eylül 2026",
      salesCount: 88,
    },
    {
      id: "ex-3",
      title: "IELTS Academic Reading Band 7.5+ Master",
      examCode: "IELTS_ACAD",
      author: "İngilizce Dil Vakfı",
      price: 119.0,
      questionCount: 40,
      status: "PENDING",
      submittedDate: "29 Eylül 2026",
      salesCount: 0,
    },
    {
      id: "ex-4",
      title: "TOEFL iBT Academic Listening & Reading Mock",
      examCode: "TOEFL_IBT",
      author: "TestPrep Global",
      price: 149.0,
      questionCount: 56,
      status: "PENDING",
      submittedDate: "30 Eylül 2026",
      salesCount: 0,
    },
  ]);

  const [users, setUsers] = useState<AdminUserItem[]>([
    {
      id: "usr-1",
      name: "Ahmet Hoca",
      email: "ahmet.elt@okul.com",
      role: "INSTRUCTOR",
      status: "ACTIVE",
      createdAt: "15 Eylül 2026",
      solvedMocks: 0,
    },
    {
      id: "usr-2",
      name: "Deniz Yılmaz",
      email: "deniz.yilmaz@ogrenci.com",
      role: "STUDENT",
      status: "ACTIVE",
      createdAt: "20 Eylül 2026",
      solvedMocks: 14,
    },
    {
      id: "usr-3",
      name: "Selin Demir",
      email: "selin.demir@ogrenci.com",
      role: "STUDENT",
      status: "ACTIVE",
      createdAt: "22 Eylül 2026",
      solvedMocks: 22,
    },
    {
      id: "usr-4",
      name: "Sistem Yöneticisi",
      email: "admin@1morequiz.com",
      role: "ADMIN",
      status: "ACTIVE",
      createdAt: "1 Eylül 2026",
      solvedMocks: 0,
    },
  ]);

  const [transactions, setTransactions] = useState<AdminTransactionItem[]>([
    {
      id: "tx-1",
      orderNumber: "ORD-20260929-8812",
      merchantOid: "PAYN-994101",
      userName: "Deniz Yılmaz",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      platformShare: 10.35,
      status: "SUCCESS",
      date: "29 Eylül 2026 14:22",
    },
    {
      id: "tx-2",
      orderNumber: "ORD-20260929-8813",
      merchantOid: "PAYN-994102",
      userName: "Berke Demir",
      examTitle: "2026 YDS Master Akademik Paragraf",
      amount: 89.0,
      platformShare: 13.35,
      status: "SUCCESS",
      date: "29 Eylül 2026 15:40",
    },
    {
      id: "tx-3",
      orderNumber: "ORD-20260930-8814",
      merchantOid: "PAYN-994103",
      userName: "Merve Çelik",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      platformShare: 10.35,
      status: "SUCCESS",
      date: "30 Eylül 2026 09:15",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveExam = (id: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status: "APPROVED" } : e));
    showToast("Deneme sınavı onaylandı ve canlı mağazaya alındı.");
  };

  const handleRejectExam = (id: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status: "REJECTED" } : e));
    showToast("Deneme sınavı reddedildi.");
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        showToast(`${u.name} kullanıcısının durumu: ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleChangeRole = (id: string, newRole: "STUDENT" | "INSTRUCTOR" | "ADMIN") => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    showToast(`Kullanıcı yetkisi ${newRole} olarak güncellendi.`);
  };

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  // ----------------------------------------------------
  // SCREEN 1: DEDICATED ADMIN LOGIN PORTAL (LIGHT THEME)
  // ----------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
        {/* Simple Light Top Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <BrandLogo size="md" variant="light" href="/" />
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </header>

        {/* Center Login Box */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
            {/* Header with Icon */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Yönetici Konsolu Girişi
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Platform yönetimi, sınav onay masası ve Paynkolay finans denetimi için yetkili erişim.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAdminAuthenticated(true);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Yönetici E-Posta</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    placeholder="admin@1morequiz.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Master Güvenlik Anahtarı</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    placeholder="Master şifreniz"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Yönetici Olarak Giriş Yap</span>
              </button>

              {/* Quick Demo Access */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => setIsAdminAuthenticated(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tek Tıkla Doğrudan Giriş Yap (Demo Master)</span>
                </button>
              </div>
            </form>

            <div className="text-center text-[11px] text-slate-400">
              Güvenli 256-Bit SSL Şifreleme • Paynkolay Entegreli
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500">
          © 2026 1morequiz • Merkezi Yönetim Konsolu
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------
  // SCREEN 2: DEDICATED AYDINLIK (LIGHT THEME) ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Dedicated Left Admin Sidebar (Aydınlık / Clean White) */}
      <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xs">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-200/90 flex items-center justify-between">
            <div className="flex flex-col gap-1 w-full">
              <BrandLogo size="md" variant="light" href="/" />
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  Master Admin
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Canlı
                </span>
              </div>
            </div>
          </div>

          {/* Admin User Card */}
          <div className="p-3 mx-4 my-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 font-black text-xs flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-black text-slate-900 truncate">
                  Sistem Yöneticisi
                </div>
                <div className="text-[10px] text-slate-500">
                  admin@1morequiz.com
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab("OVERVIEW")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === "OVERVIEW"
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-amber-600" />
                <span>Genel Bakış</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("EXAMS")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === "EXAMS"
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Denemeler & Onay</span>
              </div>
              {exams.filter(e => e.status === "PENDING").length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {exams.filter(e => e.status === "PENDING").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("USERS")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === "USERS"
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Kullanıcı Yönetimi</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("FINANCE")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === "FINANCE"
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Paynkolay Finans</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("SYSTEM")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === "SYSTEM"
                  ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-amber-600" />
                <span>AI & Sistem Ayarları</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80">
          <button
            onClick={() => setIsAdminAuthenticated(false)}
            className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-rose-600 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Güvenli Çıkış Yap</span>
          </button>
          <div className="text-[10px] text-center text-slate-400 mt-2">
            1morequiz v1.0 • Aydınlık Panel
          </div>
        </div>
      </aside>

      {/* Main Workspace (Light Background) */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/90 px-8 py-4 sticky top-0 z-30 flex items-center justify-between shadow-xs">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Master Yönetim & Moderasyon Masası
            </h2>
            <p className="text-xs text-slate-500">
              Platform denetimi, sınav onayları, kullanıcı rolleri ve Paynkolay Sanal POS muhasebesi
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Paynkolay POS: Bağlı</span>
            </div>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Ana Sayfa
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* 4 Light KPI Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
            {/* KPI 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Toplam Kullanıcı</span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{users.length * 350 + 20}</div>
              <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>%18 bu ay büyüme</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Aktif Deneme Sınavları</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{exams.length + 24}</div>
              <div className="text-xs text-amber-700 font-bold">
                {exams.filter(e => e.status === "PENDING").length} Deneme onay bekliyor
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Paynkolay Ciro</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-600">{totalRevenue * 150 + 12450} ₺</div>
              <div className="text-xs text-slate-500">
                Platform Payı (%15): <strong className="text-slate-800">{(totalRevenue * 150 + 12450) * 0.15} ₺</strong>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Soru Havuzu & IRT</span>
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">4,850 Soru</div>
              <div className="text-xs text-slate-500">
                IRT Parametresi: <strong className="text-emerald-600">Kalibre</strong>
              </div>
            </div>
          </section>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "OVERVIEW" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Pending Actions Box */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>İnceleme ve Onay Bekleyen İçerikler</span>
                    </h3>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {exams.filter(e => e.status === "PENDING").length} Bekliyor
                    </span>
                  </div>

                  <div className="space-y-3">
                    {exams.filter(e => e.status === "PENDING").map((ex) => (
                      <div key={ex.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-black text-slate-900">{ex.title}</div>
                          <div className="text-slate-500 mt-0.5">Yazar: {ex.author} • {ex.questionCount} Soru • Fiyat: {ex.price} ₺</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveExam(ex.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs cursor-pointer"
                          >
                            Onayla
                          </button>
                          <button
                            onClick={() => handleRejectExam(ex.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition-all cursor-pointer"
                          >
                            Reddet
                          </button>
                        </div>
                      </div>
                    ))}
                    {exams.filter(e => e.status === "PENDING").length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        Onay bekleyen deneme sınavı bulunmuyor.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Real-time System Status */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Sistem & Entegrasyon Sağlığı</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-black text-slate-900">Paynkolay Sanal POS API</div>
                        <div className="text-slate-500">Merchant: AKTIF_BANK_LIVE • 3D Secure v2.2</div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Aktif & Bağlı
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-black text-slate-900">AI Deneme Stüdyosu OCR Motoru</div>
                        <div className="text-slate-500">pdf-parse v2 + Otomatik Regex Ayıklama</div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Hazır (%98.2 Doğruluk)
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-black text-slate-900">Item Response Theory (IRT) Algoritması</div>
                        <div className="text-slate-500">Adaptive Yetenek Skoru & Rasch Modeli</div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Theta Kalibre
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXAMS & MODERATION TABLE */}
          {activeTab === "EXAMS" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in space-y-4 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Tüm Deneme Sınavları & Moderasyon Masası</h3>
                  <p className="text-xs text-slate-500">Eğitmenlerin yüklediği denemeleri inceleyin, onaylayın veya mağazadan kaldırın.</p>
                </div>
                <div className="relative w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Deneme adı veya yazar ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Deneme Başlığı</th>
                      <th className="py-3 px-4">Sınav Kodu</th>
                      <th className="py-3 px-4">Yazar</th>
                      <th className="py-3 px-4">Fiyat</th>
                      <th className="py-3 px-4">Satış</th>
                      <th className="py-3 px-4">Durum</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{exam.title}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px]">
                            {exam.examCode}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{exam.author}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900">{exam.price} ₺</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">{exam.salesCount}</td>
                        <td className="py-3.5 px-4">
                          {exam.status === "APPROVED" && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                              Onaylandı (Canlıda)
                            </span>
                          )}
                          {exam.status === "PENDING" && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px]">
                              İnceleme Bekliyor
                            </span>
                          )}
                          {exam.status === "REJECTED" && (
                            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px]">
                              Reddedildi
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {exam.status !== "APPROVED" && (
                              <button
                                onClick={() => handleApproveExam(exam.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Onayla
                              </button>
                            )}
                            {exam.status !== "REJECTED" && (
                              <button
                                onClick={() => handleRejectExam(exam.id)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-[11px] cursor-pointer"
                              >
                                Reddet
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: USER & ROLE MANAGEMENT */}
          {activeTab === "USERS" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in space-y-4 p-6">
              <div>
                <h3 className="font-black text-lg text-slate-900">Kullanıcı & Rol Yönetim Paneli</h3>
                <p className="text-xs text-slate-500">Platformdaki öğrencileri, öğretmenleri ve yetkilendirmeleri yönetin.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Ad Soyad</th>
                      <th className="py-3 px-4">E-Posta</th>
                      <th className="py-3 px-4">Mevcut Rol</th>
                      <th className="py-3 px-4">Hesap Durumu</th>
                      <th className="py-3 px-4">Kayıt Tarihi</th>
                      <th className="py-3 px-4 text-right">Rol Değiştir & Askıya Al</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{user.name}</td>
                        <td className="py-3.5 px-4 text-slate-600">{user.email}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            user.role === "ADMIN" 
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : user.role === "INSTRUCTOR"
                              ? "bg-sky-100 text-sky-800 border border-sky-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            user.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}>
                            {user.status === "ACTIVE" ? "Aktif" : "Askıda"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{user.createdAt}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <select
                              value={user.role}
                              onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                              className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[11px] cursor-pointer"
                            >
                              <option value="STUDENT">Öğrenci</option>
                              <option value="INSTRUCTOR">Eğitmen</option>
                              <option value="ADMIN">Master Admin</option>
                            </select>

                            <button
                              onClick={() => handleToggleUserStatus(user.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                            >
                              {user.status === "ACTIVE" ? "Askıya Al" : "Aktifleştir"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PAYNKOLAY FINANCE */}
          {activeTab === "FINANCE" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-black text-lg text-slate-900">Paynkolay Sanal POS İşlem Defteri</h3>
                <p className="text-xs text-slate-500">Banka provizyonları, platform komisyonu ve eğitmen hakediş dökümü.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">Toplam Brüt Satış</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">{totalRevenue * 150 + 12450} ₺</div>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-bold text-amber-700">Platform Komisyon Geliri (%15)</div>
                  <div className="text-2xl font-black text-amber-900 mt-1">{(totalRevenue * 150 + 12450) * 0.15} ₺</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-700">Eğitmenlere Aktarılacak Net Tutar</div>
                  <div className="text-2xl font-black text-emerald-900 mt-1">{(totalRevenue * 150 + 12450) * 0.85} ₺</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Sipariş No</th>
                      <th className="py-3 px-4">Paynkolay Ref</th>
                      <th className="py-3 px-4">Kullanıcı</th>
                      <th className="py-3 px-4">Deneme</th>
                      <th className="py-3 px-4">Tutar</th>
                      <th className="py-3 px-4">Platform Payı</th>
                      <th className="py-3 px-4">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{tx.orderNumber}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">{tx.merchantOid}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{tx.userName}</td>
                        <td className="py-3.5 px-4 text-slate-600">{tx.examTitle}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900">{tx.amount} ₺</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">{tx.platformShare} ₺</td>
                        <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM & AI SETTINGS */}
          {activeTab === "SYSTEM" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6 animate-in fade-in max-w-4xl">
              <div>
                <h3 className="font-black text-lg text-slate-900">AI & IRT Çekirdek Sistem Parametreleri</h3>
                <p className="text-xs text-slate-500">Adaptif soru yönlendirme, OCR hassasiyeti ve Paynkolay webhook yapılandırması.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-black text-slate-900">IRT Yetenek (Theta) Eşik Değeri</div>
                  <p className="text-slate-500">Öğrencinin adaptif soru havuzundan telafi alabilmesi için maksimum hata katsayısı.</p>
                  <input
                    type="range"
                    min="-3.0"
                    max="3.0"
                    step="0.1"
                    defaultValue="0.0"
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                    <span>-3.0 (Kolay)</span>
                    <span className="text-amber-600 font-black">0.0 (Dengeli)</span>
                    <span>+3.0 (İleri Düzey)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-black text-slate-900">PDF OCR & Yapay Zeka Doğruluk Filtresi</div>
                  <p className="text-slate-500">Şıkların ve soru gövdesinin otomatik ayrıştırılmasında minimum güven skoru (%95 önerilir).</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      defaultValue="95"
                      className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold text-xs"
                    />
                    <span className="text-slate-500 font-bold">% ve üzeri güven</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Sistem ve IRT parametreleri başarıyla güncellendi.")}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Ayarları Kaydet
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
