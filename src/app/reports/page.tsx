"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  BarChart2, 
  Send, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp,
  Download,
  X,
  Calendar,
  AlertCircle,
  Check
} from "lucide-react";

interface ExamReportItem {
  id: string;
  title: string;
  examCode: string;
  hostedDate: string;
  participantsCount: number;
  accessCode: string;
  targetClass: string;
  averageScore: string;
  weakestTopic: string;
  status: "COMPLETED" | "RUNNING" | "SCHEDULED";
}

export default function ReportsPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [activeTab, setActiveTab] = useState<"ALL" | "RUNNING" | "COMPLETED" | "SCHEDULED">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Assignment Modal State
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ExamReportItem | null>(null);
  const [selectedClass, setSelectedClass] = useState("YDT 2026 İlk 1000 Grubu");
  const [assignmentScope, setAssignmentScope] = useState<"FULL" | "WEAKEST_TOPIC">("FULL");
  const [dueDate, setDueDate] = useState("2026-10-05");
  const [minScore, setMinScore] = useState("70");
  const [notifyParents, setNotifyParents] = useState(true);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const reports: ExamReportItem[] = [
    {
      id: "rep-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      examCode: "YDT",
      hostedDate: "28 Eylül 2026",
      participantsCount: 42,
      accessCode: "904182",
      targetClass: "12-DİL Şampiyonlar",
      averageScore: "68.25 Net",
      weakestTopic: "Grammar::Conditionals (%31 Başarı)",
      status: "COMPLETED",
    },
    {
      id: "rep-2",
      title: "2026 YDS Master Akademik Paragraf & Çeviri",
      examCode: "YDS",
      hostedDate: "25 Eylül 2026",
      participantsCount: 28,
      accessCode: "812044",
      targetClass: "YDS 80+ Master Grubu",
      averageScore: "74.50 Puan",
      weakestTopic: "Vocabulary::Phrasal_Verbs (%28 Başarı)",
      status: "COMPLETED",
    },
    {
      id: "rep-3",
      title: "IELTS Academic Reading Mock - Section 1-3",
      examCode: "IELTS_ACAD",
      hostedDate: "Canlı Yayında",
      participantsCount: 15,
      accessCode: "770192",
      targetClass: "IELTS Band 7.5 Kulübü",
      averageScore: "Band 6.5 (Ort)",
      weakestTopic: "Reading::True_False_NG",
      status: "RUNNING",
    },
  ];

  const filteredReports = reports.filter((rep) => {
    if (activeTab === "RUNNING" && rep.status !== "RUNNING") return false;
    if (activeTab === "COMPLETED" && rep.status !== "COMPLETED") return false;
    if (activeTab === "SCHEDULED" && rep.status !== "SCHEDULED") return false;

    if (
      searchTerm &&
      !rep.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !rep.accessCode.includes(searchTerm)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0f17] flex text-slate-100">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-100">Sınav Raporları & Analitik</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Katılımcı karneleri, madde analizleri ve en zayıf kazanım tespiti
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Rapor adına veya sınav koduna göre ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-72"
            />
          </div>
        </div>

        {/* Filter Tabs matching Screenshot 2 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === "ALL" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Her Şey ({reports.length})
            </button>
            <button
              onClick={() => setActiveTab("RUNNING")}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === "RUNNING" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Canlı / Koşma ({reports.filter((r) => r.status === "RUNNING").length})
            </button>
            <button
              onClick={() => setActiveTab("COMPLETED")}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === "COMPLETED" ? "bg-slate-800 text-sky-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tamamlanmış ({reports.filter((r) => r.status === "COMPLETED").length})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Excel Dışa Aktar</span>
            </button>
          </div>
        </div>

        {/* Reports Table (Mirrors Screenshot 2) */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-5 flex items-center gap-3">
              <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
              <span>Etkinlik Adı & Sınav</span>
            </div>
            <div className="col-span-2">Ev Sahipliği</div>
            <div className="col-span-1 text-center">Katılımcı</div>
            <div className="col-span-1 text-center">Sınav Kodu</div>
            <div className="col-span-3 text-right">Eylemler & Teşhis</div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredReports.map((rep) => (
              <div
                key={rep.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-850/50 transition-colors"
              >
                {/* Exam Title */}
                <div className="col-span-5 flex items-center gap-3">
                  <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{rep.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        {rep.examCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                      ⚠️ En Zayıf: {rep.weakestTopic}
                    </div>
                  </div>
                </div>

                {/* Hosted Date */}
                <div className="col-span-2 text-xs text-slate-300">
                  <span>{rep.hostedDate}</span>
                  <span className="text-slate-500 text-[11px] block">{rep.targetClass}</span>
                </div>

                {/* Participants */}
                <div className="col-span-1 text-center text-xs font-bold text-slate-200">
                  {rep.participantsCount}
                </div>

                {/* Exam Code */}
                <div className="col-span-1 text-center font-mono text-xs font-bold text-sky-400 bg-slate-900 py-1 rounded-lg border border-slate-800">
                  {rep.accessCode}
                </div>

                {/* Actions & Buttons */}
                <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                  <button 
                    onClick={() => {
                      setSelectedReport(rep);
                      setAssignModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-sky-950 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ödev Ver</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl flex items-center gap-3 text-xs text-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Ödev Başarıyla Atandı!</div>
              <div>{successToast}</div>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="ml-3 text-emerald-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal: Ödev Olarak Ata (Mirrors Wayground / Screenshot 2) */}
        {assignModalOpen && selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111827] border border-slate-700/80 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative space-y-6">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Sınıfa Ödev Ata</span>
                </div>
                <h3 className="font-extrabold text-slate-100 text-lg leading-snug">
                  {selectedReport.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Aktivite Kodu: <span className="font-mono text-sky-400 font-bold">{selectedReport.accessCode}</span>
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAssignModalOpen(false);
                  setSuccessToast(`"${selectedClass}" sınıfına ödev atandı! Öğrenciler aktivite kodu "${selectedReport.accessCode}" ile başlayabilir.`);
                  setTimeout(() => setSuccessToast(null), 5000);
                }}
                className="space-y-4 text-xs"
              >
                {/* 1. Hedef Sınıf */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                    Hedef Sınıf Seçin
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-sky-500 font-medium"
                  >
                    <option value="YDT 2026 İlk 1000 Grubu">YDT 2026 İlk 1000 Grubu (24 Öğrenci)</option>
                    <option value="YDS Master 80+ Akademik Grup">YDS Master 80+ Akademik Grup (16 Öğrenci)</option>
                    <option value="IELTS Band 7.5 Speaking & Writing Kulübü">IELTS Band 7.5 Kulübü (12 Öğrenci)</option>
                    <option value="Tüm Kayıtlı Öğrenciler">Tüm Kayıtlı Öğrenciler (Genel Ödev)</option>
                  </select>
                </div>

                {/* 2. Ödev Kapsamı: Tam Deneme vs En Zayıf Kazanım */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                    Ödev Kapsamı & Görev Türü
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAssignmentScope("FULL")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        assignmentScope === "FULL"
                          ? "bg-sky-950/40 border-sky-500 text-sky-200"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-100">Tam Deneme Sınavı</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">80 Soru • Süreli & Optik Formlu</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAssignmentScope("WEAKEST_TOPIC")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        assignmentScope === "WEAKEST_TOPIC"
                          ? "bg-amber-950/40 border-amber-500 text-amber-200"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Hedefli Pekiştirme</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{selectedReport.weakestTopic.split(" ")[0]} (15 Soru)</div>
                    </button>
                  </div>
                </div>

                {/* 3. Son Teslim Tarihi & Geçme Şartı */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                      Son Teslim Tarihi
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                      Hedef Başarı Eşiği (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={minScore}
                      onChange={(e) => setMinScore(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* 4. Veli Bildirimi Toggle */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="notifyParentsAssign"
                    checked={notifyParents}
                    onChange={(e) => setNotifyParents(e.target.checked)}
                    className="mt-1 rounded bg-slate-800 border-slate-700 text-sky-600 focus:ring-0"
                  />
                  <label htmlFor="notifyParentsAssign" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    <strong className="text-slate-100 block">
                      Veli Bilgilendirmesi Gönder
                    </strong>
                    Ödev atandığında ve teslim edildiğinde velilere otomatik e-posta & SMS raporu iletilir.
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAssignModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-sky-950 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ödevi Yayınla & Gönder</span>
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
