"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Upload, 
  Mail, 
  X, 
  Check, 
  GraduationCap, 
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Send,
  Share2,
  Copy,
  CheckCircle2,
  TrendingUp,
  Award
} from "lucide-react";

interface StudentItem {
  id: string;
  name: string;
  email: string;
  parentEmail?: string;
  solvedMocksCount: number;
  averageScore: string;
  masteryRate: string;
}

interface Classroom {
  id: string;
  code: string;
  name: string;
  gradeLevel: string;
  studentCount: number;
  color: string;
  requireParentEmail: boolean;
  students: StudentItem[];
  activeAssignment?: {
    title: string;
    code: string;
    dueDate: string;
    completionRate: string;
  };
}

export default function StudentsPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClassId, setExpandedClassId] = useState<string | null>("cls-1");

  // Invite Student Modal State
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedClassForInvite, setSelectedClassForInvite] = useState<Classroom | null>(null);
  const [studentNameInput, setStudentNameInput] = useState("");
  const [studentEmailInput, setStudentEmailInput] = useState("");
  const [parentEmailInput, setParentEmailInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial classrooms mirroring screenshot 3 & 4
  const [classes, setClasses] = useState<Classroom[]>([
    {
      id: "cls-1",
      code: "YDT-9041",
      name: "YDT 2026 İlk 1000 Grubu",
      gradeLevel: "12. Sınıf / Mezun",
      studentCount: 3,
      color: "#3b82f6",
      requireParentEmail: true,
      activeAssignment: {
        title: "2026 YDT Şampiyonlar Özgün Deneme #1",
        code: "904182",
        dueDate: "5 Ekim 2026",
        completionRate: "%75 (18/24 Tamamlandı)"
      },
      students: [
        {
          id: "st-1",
          name: "Selin Yılmaz",
          email: "selin.yilmaz@okul.k12.tr",
          parentEmail: "emine.yilmaz@gmail.com",
          solvedMocksCount: 11,
          averageScore: "76.25 Net",
          masteryRate: "%92"
        },
        {
          id: "st-2",
          name: "Deniz Kaya",
          email: "deniz.kaya@okul.k12.tr",
          parentEmail: "zeynep.kaya@gmail.com",
          solvedMocksCount: 8,
          averageScore: "72.50 Net",
          masteryRate: "%85"
        },
        {
          id: "st-3",
          name: "Berke Demir",
          email: "berke.demir@okul.k12.tr",
          parentEmail: "ahmet.demir@gmail.com",
          solvedMocksCount: 6,
          averageScore: "64.00 Net",
          masteryRate: "%71"
        }
      ]
    },
    {
      id: "cls-2",
      code: "YDS-8120",
      name: "YDS Master 80+ Akademik Grup",
      gradeLevel: "Yetişkin / Lisansüstü",
      studentCount: 2,
      color: "#8b5cf6",
      requireParentEmail: false,
      activeAssignment: {
        title: "2026 YDS Master Akademik Paragraf & Çeviri",
        code: "812044",
        dueDate: "8 Ekim 2026",
        completionRate: "%60 (12/20 Tamamlandı)"
      },
      students: [
        {
          id: "st-4",
          name: "Canan Özkan",
          email: "canan.ozkan@akademik.edu.tr",
          solvedMocksCount: 9,
          averageScore: "81.25 Puan",
          masteryRate: "%88"
        },
        {
          id: "st-5",
          name: "Tolga Arslan",
          email: "tolga.arslan@akademik.edu.tr",
          solvedMocksCount: 5,
          averageScore: "73.75 Puan",
          masteryRate: "%78"
        }
      ]
    },
    {
      id: "cls-3",
      code: "IEL-7701",
      name: "IELTS Band 7.5 Speaking & Writing Kulübü",
      gradeLevel: "Yurt Dışı Hazırlık",
      studentCount: 1,
      color: "#10b981",
      requireParentEmail: false,
      students: [
        {
          id: "st-6",
          name: "Merve Çelik",
          email: "merve.celik@ieltsclub.org",
          solvedMocksCount: 7,
          averageScore: "Band 7.5",
          masteryRate: "%89"
        }
      ]
    }
  ]);

  // Modal Form State (Screenshot 4)
  const [newClassName, setNewClassName] = useState("");
  const [newClassColor, setNewClassColor] = useState("#8b5cf6");
  const [requireParentEmail, setRequireParentEmail] = useState(true);

  const colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newClass: Classroom = {
      id: `cls-${Date.now()}`,
      code: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newClassName.trim(),
      gradeLevel: "İngilizce Sınav Grubu",
      studentCount: 0,
      color: newClassColor,
      requireParentEmail,
      students: []
    };

    setClasses([newClass, ...classes]);
    setNewClassName("");
    setIsModalOpen(false);
    setToastMessage(`"${newClass.name}" sınıfı başarıyla oluşturuldu!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassForInvite || !studentNameInput.trim() || !studentEmailInput.trim()) return;

    const newStudent: StudentItem = {
      id: `st-${Date.now()}`,
      name: studentNameInput.trim(),
      email: studentEmailInput.trim(),
      parentEmail: parentEmailInput.trim() || undefined,
      solvedMocksCount: 0,
      averageScore: "Henüz Sınav Yok",
      masteryRate: "%0"
    };

    setClasses(prev => prev.map(c => {
      if (c.id === selectedClassForInvite.id) {
        return {
          ...c,
          studentCount: c.studentCount + 1,
          students: [newStudent, ...c.students]
        };
      }
      return c;
    }));

    setToastMessage(`"${newStudent.name}" ${selectedClassForInvite.name} sınıfına eklendi.`);
    setStudentNameInput("");
    setStudentEmailInput("");
    setParentEmailInput("");
    setInviteModalOpen(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyInviteLink = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/join?classCode=${code}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Actions matching Screenshot 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Sınıflarım & Gruplar</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Sınav koçluğu yaptığınız sınıflar, öğrenci listeleri ve toplu deneme atamaları
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Sınıf veya kod ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 w-52 shadow-xs"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Sınıf Oluştur</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Class Cards List matching Screenshot 3 */}
        <div className="space-y-4">
          {filteredClasses.map((cls) => {
            const isExpanded = expandedClassId === cls.id;

            return (
              <div
                key={cls.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-xs overflow-hidden"
              >
                {/* Main Class Card Row */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs font-bold text-base"
                      style={{ backgroundColor: cls.color }}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {cls.name}
                        </h3>
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-sky-700">
                          {cls.code}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                          {cls.gradeLevel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-sky-600" />
                          <strong className="text-slate-800">{cls.students.length}</strong> Kayıtlı Öğrenci
                        </span>
                        {cls.requireParentEmail && (
                          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Mail className="w-3.5 h-3.5" />
                            Veli Raporlama Aktif
                          </span>
                        )}
                        {cls.activeAssignment && (
                          <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                            <BookOpen className="w-3.5 h-3.5" />
                            Aktif Ödev: {cls.activeAssignment.completionRate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setSelectedClassForInvite(cls);
                        setInviteModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-sky-600" />
                      <span>Öğrenci Ekle</span>
                    </button>

                    <button
                      onClick={() => router.push(`/reports`)}
                      className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-xs font-bold text-sky-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Toplu Deneme Ata</span>
                    </button>

                    <button
                      onClick={() => setExpandedClassId(isExpanded ? null : cls.id)}
                      className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Student Roster & Activity Tray */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/60 p-5 space-y-4 animate-in fade-in">
                    {/* Active Assignment Bar if exists */}
                    {cls.activeAssignment && (
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{cls.activeAssignment.title}</div>
                            <div className="text-[11px] text-slate-500">Son Gün: {cls.activeAssignment.dueDate} • Aktivite Kodu: {cls.activeAssignment.code}</div>
                          </div>
                        </div>
                        <div className="font-bold text-amber-700">
                          {cls.activeAssignment.completionRate}
                        </div>
                      </div>
                    )}

                    {/* Student List */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Kayıtlı Öğrenci Listesi ({cls.students.length})</span>
                        <span>Sınav Karnesi & Başarı</span>
                      </div>

                      {cls.students.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-500">
                          Bu sınıfta henüz kayıtlı öğrenci yok. "Öğrenci Ekle" butonuna basarak ilk öğrenciyi davet edin.
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                          {cls.students.map((st) => (
                            <div key={st.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-[11px]">
                                  {st.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900">{st.name}</div>
                                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                                    <span>{st.email}</span>
                                    {st.parentEmail && (
                                      <>
                                        <span>•</span>
                                        <span className="text-emerald-700 font-medium">Veli: {st.parentEmail}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-right">
                                <div>
                                  <div className="font-bold text-emerald-700">{st.averageScore}</div>
                                  <div className="text-[11px] text-slate-500">{st.solvedMocksCount} Deneme Çözüldü</div>
                                </div>
                                <div className="text-center font-mono font-bold text-sky-700 bg-sky-50 px-2 py-1 rounded-lg border border-sky-200 text-[11px]">
                                  {st.masteryRate}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal 1: Yeni Bir Sınıf Oluştur */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-extrabold text-slate-900 text-lg mb-4">
                Yeni bir sınıf oluştur
              </h3>

              <form onSubmit={handleCreateClass} className="space-y-5">
                {/* Class Name & Color Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Sınıf adını girin
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder='"12-DİL YDT Şampiyonlar" veya "IELTS Band 7+" deneyin'
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />

                    {/* Color selector */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                      {colors.slice(0, 3).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setNewClassColor(col)}
                          className="w-5 h-5 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                          style={{ backgroundColor: col }}
                        >
                          {newClassColor === col && <Check className="w-3 h-3 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Parent Email Requirement Checkbox */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="requireParent"
                    checked={requireParentEmail}
                    onChange={(e) => setRequireParentEmail(e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="requireParent" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                    <strong className="text-slate-900 block">
                      Öğrencilerin bir velinin e-posta adresini girmelerini zorunlu kılın
                    </strong>
                    İlerleme raporlarını, deneme netlerini ve eksik kazanım karnelerini anında veliyle paylaşın!
                  </label>
                </div>

                {/* Buttons (Cancel & Create) */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs transition-all cursor-pointer"
                  >
                    Sınıf Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 2: Öğrenci Davet Et / Ekle */}
        {inviteModalOpen && selectedClassForInvite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative space-y-6">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Öğrenci Ekle & Davet Et</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {selectedClassForInvite.name}
                </h3>
              </div>

              {/* Fast Invite Link Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  Sınıfa Katılım Bağlantısı & Sınıf Kodu
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-sky-700 truncate shadow-xs">
                    1morequestion.com/join?code={selectedClassForInvite.code}
                  </div>
                  <button
                    onClick={() => handleCopyInviteLink(selectedClassForInvite.code)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isCopied ? "Kopyalandı!" : "Kopyala"}</span>
                  </button>
                </div>
              </div>

              {/* Direct Add Form */}
              <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1">
                    Öğrenci Adı Soyadı
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ayşe Demir"
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1">
                    Öğrenci E-posta Adresi
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ogrenci@okul.com"
                    value={studentEmailInput}
                    onChange={(e) => setStudentEmailInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                {selectedClassForInvite.requireParentEmail && (
                  <div>
                    <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1">
                      Veli E-posta Adresi (Zorunlu)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="veli@gmail.com"
                      value={parentEmailInput}
                      onChange={(e) => setParentEmailInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 rounded-xl font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-xs cursor-pointer"
                  >
                    Öğrenciyi Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
