"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
  defaultRole?: "STUDENT" | "INSTRUCTOR";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "login",
  defaultRole = "STUDENT",
}: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedExam, setSelectedExam] = useState("YDT");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Store user session in localStorage for instant mock persistence
      const userData = {
        name: fullName || (email ? email.split("@")[0] : "Kullanıcı"),
        email: email || "ogrenci@1morequiz.com",
        role: role,
        targetExam: selectedExam,
        tokens: 500,
        loggedInAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("1morequiz_user", JSON.stringify(userData));
      }

      onClose();
      if (role === "STUDENT") {
        router.push(`/student?exam=${selectedExam}`);
      } else {
        router.push("/instructor");
      }
    }, 600);
  };

  const handleQuickDemo = (demoRole: "STUDENT" | "INSTRUCTOR", demoExam = "YDT") => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = demoRole === "STUDENT" 
        ? { name: "Ece Tunç", email: "ece.tunc@boun.edu.tr", role: "STUDENT", targetExam: demoExam, tokens: 650 }
        : { name: "Ahmet Hoca (ELT)", email: "ahmet@1morequiz.com", role: "INSTRUCTOR", targetExam: "ALL", tokens: 1200 };
      
      if (typeof window !== "undefined") {
        localStorage.setItem("1morequiz_user", JSON.stringify(demoUser));
      }

      onClose();
      if (demoRole === "STUDENT") {
        router.push(`/student?exam=${demoExam}`);
      } else {
        router.push("/instructor");
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[440px] bg-white rounded-[12px] border border-[#d9dde8] shadow-[0_8px_32px_rgba(40,46,62,0.15)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Logo and Close */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#d9dde8]/70">
          <BrandLogo size="sm" showText={false} />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f6f7fb] text-[#586380] hover:text-[#282e3e] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Giriş Yap | Kayıt Ol */}
        <div className="flex border-b border-[#d9dde8] bg-[#f6f7fb]/60 text-[14px]">
          <button
            onClick={() => { setMode("login"); setErrorMessage(""); }}
            className={`flex-1 py-3 text-center font-semibold transition-colors cursor-pointer ${
              mode === "login"
                ? "text-[#4255ff] border-b-2 border-[#4255ff] bg-white"
                : "text-[#586380] hover:text-[#282e3e]"
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => { setMode("register"); setErrorMessage(""); }}
            className={`flex-1 py-3 text-center font-semibold transition-colors cursor-pointer ${
              mode === "register"
                ? "text-[#4255ff] border-b-2 border-[#4255ff] bg-white"
                : "text-[#586380] hover:text-[#282e3e]"
            }`}
          >
            Ücretsiz Kayıt Ol
          </button>
        </div>

        {/* Body Container */}
        <div className="p-6 space-y-5">
          {/* Role Selector: Öğrenci | Öğretmen */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-[#586380] uppercase tracking-wider">
              Kullanıcı Rolü
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("STUDENT")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] border text-[13px] font-semibold transition-all cursor-pointer ${
                  role === "STUDENT"
                    ? "bg-[#edefff] border-[#4255ff] text-[#4255ff]"
                    : "bg-white border-[#d9dde8] text-[#586380] hover:bg-[#f6f7fb]"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Öğrenci</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("INSTRUCTOR")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] border text-[13px] font-semibold transition-all cursor-pointer ${
                  role === "INSTRUCTOR"
                    ? "bg-[#edefff] border-[#4255ff] text-[#4255ff]"
                    : "bg-white border-[#d9dde8] text-[#586380] hover:bg-[#f6f7fb]"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Öğretmen / Eğitmen</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-2.5 rounded-[4px] bg-red-50 border border-red-200 text-red-700 text-[12px] font-medium">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === "register" && (
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#282e3e]">
                  Ad Soyad
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-[#939bb4]" />
                  <input
                    type="text"
                    required
                    placeholder="Örn: Deniz Yılmaz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#282e3e]">
                E-posta Adresi
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-[#939bb4]" />
                <input
                  type="email"
                  required
                  placeholder="ornek@ogrenci.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-[#282e3e]">
                  Şifre
                </label>
                {mode === "login" && (
                  <button 
                    type="button"
                    onClick={() => alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.")}
                    className="text-[11px] text-[#4255ff] hover:underline"
                  >
                    Şifremi Unuttum
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-[#939bb4]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#939bb4] hover:text-[#282e3e]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Target Exam Selection on Registration (Key User Requirement!) */}
            {mode === "register" && role === "STUDENT" && (
              <div className="space-y-1 pt-1">
                <label className="text-[12px] font-semibold text-[#282e3e]">
                  Hedef Dil Sınavınız
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[13px] text-[#282e3e] bg-white focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all font-medium"
                >
                  <option value="YDT">YDT (YKS-Dil Hazırlık)</option>
                  <option value="YDS">YDS & YÖKDİL (Akademik Dil Sınavları)</option>
                  <option value="BUEPT">Boğaziçi Üniversitesi BUEPT / BÜYES</option>
                  <option value="ODTU_IYS">ODTÜ & İTÜ İYS (İngilizce Yeterlik Sınavı)</option>
                  <option value="PROFICIENCY">Bilkent PAE / Koç KUEPE / Genel Muafiyet</option>
                  <option value="IELTS">IELTS Academic (Band 7.5+)</option>
                  <option value="TOEFL">TOEFL iBT & PTE Academic</option>
                </select>
                <p className="text-[11px] text-[#586380]">
                  Seçtiğiniz sınava göre soru havuzunuz ve denemeleriniz anında hazırlanır.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                <>
                  <span>{mode === "login" ? "Giriş Yap" : "Hesabımı Oluştur"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-[#d9dde8] space-y-2">
            <div className="text-[11px] text-center font-semibold text-[#586380] uppercase tracking-wider">
              Hızlı Test Girişi (Şifresiz Demo)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("STUDENT", "BUEPT")}
                className="py-1.5 px-2 rounded-[4px] bg-[#f6f7fb] hover:bg-[#edefff] border border-[#d9dde8] text-[11px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-all text-center cursor-pointer"
              >
                🎓 Öğrenci Demosu
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("INSTRUCTOR")}
                className="py-1.5 px-2 rounded-[4px] bg-[#f6f7fb] hover:bg-[#edefff] border border-[#d9dde8] text-[11px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-all text-center cursor-pointer"
              >
                👨‍🏫 Eğitmen Demosu
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#f6f7fb] border-t border-[#d9dde8] text-center text-[11px] text-[#586380]">
          KVKK ve Kullanım Şartları koruması altındadır.
        </div>
      </div>
    </div>
  );
}
