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
  Check,
  Eye,
  Volume2,
  Sparkles,
  FileText
} from "lucide-react";
import { ExamReportInspectionModal } from "@/components/ExamReportInspectionModal";
import { AudioSubmissionsManager } from "@/components/AudioSubmissionsManager";
import { 
  INITIAL_DETAILED_REPORTS, 
  INITIAL_AUDIO_SUBMISSIONS, 
  ExamDetailedReport 
} from "@/lib/audio-and-reports";

export default function ReportsPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [mainView, setMainView] = useState<"REPORTS" | "AUDIO">("REPORTS");
  const [activeTab, setActiveTab] = useState<"ALL" | "RUNNING" | "COMPLETED" | "SCHEDULED">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Detailed Report Inspection State
  const [inspectReport, setInspectReport] = useState<ExamDetailedReport | null>(null);

  // Assignment Modal State
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ExamDetailedReport | null>(null);
  const [selectedClass, setSelectedClass] = useState("YDT 2026 İlk 1000 Grubu");
  const [assignmentScope, setAssignmentScope] = useState<"FULL" | "WEAKEST_TOPIC">("FULL");
  const [dueDate, setDueDate] = useState("2026-10-05");
  const [minScore, setMinScore] = useState("70");
  const [notifyParents, setNotifyParents] = useState(true);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const reports = INITIAL_DETAILED_REPORTS;

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

  const handleOpenAssignModal = (rep: ExamDetailedReport) => {
    setSelectedReport(rep);
    setAssignModalOpen(true);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignModalOpen(false);
    setSuccessToast(`Ödev başarıyla atandı: ${selectedClass} grubuna '${selectedReport?.title}' gönderildi.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Main View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d9dde8]">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#282e3e]">
                Sınav Raporları & Ses Denetim Masası
              </h1>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#edefff] text-[#4255ff] border border-[#d9dde8] font-bold">
                Eğitmen Portali
              </span>
            </div>
            <p className="text-xs text-[#586380] mt-0.5">
              Katılımcı karneleri, konuşma ses kayıtları, essay metinleri ve en zayıf kazanım teşhisleri
            </p>
          </div>

          {/* Main View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f6f7fb] border border-[#d9dde8] rounded-[200px]">
            <button
              onClick={() => setMainView("REPORTS")}
              className={`text-xs px-4 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mainView === "REPORTS"
                  ? "bg-[#4255ff] text-white shadow-xs"
                  : "text-[#586380] hover:text-[#282e3e]"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Sınav Raporları ({reports.length})</span>
            </button>

            <button
              onClick={() => setMainView("AUDIO")}
              className={`text-xs px-4 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mainView === "AUDIO"
                  ? "bg-[#4255ff] text-white shadow-xs"
                  : "text-[#586380] hover:text-[#282e3e]"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Yüklenen Ses Kayıtları ({INITIAL_AUDIO_SUBMISSIONS.length})</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: SINAV RAPORLARI */}
        {mainView === "REPORTS" && (
          <div className="space-y-5">
            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-[#f6f7fb] p-1 rounded-[200px] border border-[#d9dde8]">
                <button
                  onClick={() => setActiveTab("ALL")}
                  className={`text-xs px-3.5 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer ${
                    activeTab === "ALL" ? "bg-[#4255ff] text-white shadow-xs" : "text-[#586380] hover:text-[#282e3e]"
                  }`}
                >
                  Tüm Raporlar ({reports.length})
                </button>
                <button
                  onClick={() => setActiveTab("RUNNING")}
                  className={`text-xs px-3.5 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer ${
                    activeTab === "RUNNING" ? "bg-emerald-600 text-white shadow-xs" : "text-[#586380] hover:text-[#282e3e]"
                  }`}
                >
                  Canlı ({reports.filter((r) => r.status === "RUNNING").length})
                </button>
                <button
                  onClick={() => setActiveTab("COMPLETED")}
                  className={`text-xs px-3.5 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer ${
                    activeTab === "COMPLETED" ? "bg-[#4255ff] text-white shadow-xs" : "text-[#586380] hover:text-[#282e3e]"
                  }`}
                >
                  Tamamlanmış ({reports.filter((r) => r.status === "COMPLETED").length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#939bb4]" />
                  <input
                    type="text"
                    placeholder="Rapor adı veya erişim kodu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border border-[#d9dde8] rounded-[200px] pl-8 pr-4 py-1.5 text-xs text-[#282e3e] placeholder-[#939bb4] focus:outline-none focus:border-[#4255ff] w-64 shadow-xs"
                  />
                </div>

                <button
                  onClick={() => alert("Tüm raporlar Excel formatında dışa aktarılıyor.")}
                  className="px-3.5 py-1.5 rounded-[200px] bg-white border border-[#d9dde8] text-[#282e3e] hover:border-[#4255ff] hover:text-[#4255ff] flex items-center gap-1.5 shadow-xs cursor-pointer text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5 text-[#586380]" />
                  <span>Dışa Aktar</span>
                </button>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white border border-[#d9dde8] rounded-[12px] overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#f6f7fb] border-b border-[#d9dde8] text-[11px] font-bold text-[#586380] uppercase tracking-wider">
                <div className="col-span-5 flex items-center gap-3">
                  <span>Sınav & Etkinlik Adı</span>
                </div>
                <div className="col-span-2">Tarih & Hedef Grup</div>
                <div className="col-span-1 text-center">Katılımcı</div>
                <div className="col-span-1 text-center">Ort. Net</div>
                <div className="col-span-3 text-right">Eylemler</div>
              </div>

              <div className="divide-y divide-[#d9dde8]">
                {filteredReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#f6f7fb]/80 transition-colors"
                  >
                    {/* Exam Title */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-[#edefff] border border-[#d9dde8] flex items-center justify-center text-[#4255ff] shrink-0 font-bold">
                        <BarChart2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#282e3e]">{rep.title}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#edefff] text-[#4255ff] font-bold border border-[#d9dde8]">
                            {rep.examCode}
                          </span>
                          {rep.audioCount > 0 && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-0.5">
                              <Volume2 className="w-2.5 h-2.5" />
                              {rep.audioCount} Ses
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                          ⚠️ En Zayıf: {rep.weakestTopic}
                        </div>
                      </div>
                    </div>

                    {/* Hosted Date & Group */}
                    <div className="col-span-2 text-xs text-[#282e3e]">
                      <span className="font-semibold block">{rep.hostedDate}</span>
                      <span className="text-[#586380] text-[11px]">{rep.targetClass}</span>
                    </div>

                    {/* Participants */}
                    <div className="col-span-1 text-center text-xs font-bold text-[#282e3e]">
                      {rep.participantsCount}
                    </div>

                    {/* Avg Score */}
                    <div className="col-span-1 text-center font-bold text-xs text-[#4255ff]">
                      {rep.averageScore}
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                      {/* Raporu İncele Button */}
                      <button
                        onClick={() => setInspectReport(rep)}
                        className="px-3 py-1.5 rounded-[200px] bg-white border border-[#4255ff] hover:bg-[#edefff] text-[#4255ff] font-bold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Raporu İncele</span>
                      </button>

                      {/* Ödev Ata Button */}
                      <button
                        onClick={() => handleOpenAssignModal(rep)}
                        className="px-3 py-1.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white font-bold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Ödev Ver</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: YÜKLENEN SES & SPEAKING KAYITLARI */}
        {mainView === "AUDIO" && (
          <AudioSubmissionsManager
            title="Öğrenci Speaking & Ses Yanıtları Denetim Masası"
            subtitle="Öğrencilerin hazırlık atlama ve mülakat sorularına yükledikleri ses kayıtlarını dinleyin, yapay zeka telaffuz ve akıcılık puanlarını onaylayın."
            role="INSTRUCTOR"
          />
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[12px] bg-white border border-emerald-300 shadow-xl flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-[#282e3e]">{successToast}</span>
          </div>
        )}
      </main>

      {/* Detailed Report Inspection Modal */}
      <ExamReportInspectionModal
        isOpen={!!inspectReport}
        onClose={() => setInspectReport(null)}
        report={inspectReport}
        audioSubmissions={INITIAL_AUDIO_SUBMISSIONS}
      />

      {/* Assignment Modal */}
      {assignModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-[#d9dde8] rounded-[16px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#d9dde8] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#282e3e] flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#4255ff]" />
                  Öğrencilere Telafi Ödevi Ata
                </h3>
                <p className="text-xs text-[#586380]">{selectedReport.title}</p>
              </div>
              <button
                onClick={() => setAssignModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#282e3e]">Hedef Sınıf / Grup</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-[8px] border border-[#d9dde8] bg-white text-[#282e3e]"
                >
                  <option value="12-DİL Şampiyonlar">12-DİL Şampiyonlar (42 Öğrenci)</option>
                  <option value="Boğaziçi & ODTÜ Hazırlık Grubu">Boğaziçi & ODTÜ Hazırlık Grubu (22 Öğrenci)</option>
                  <option value="YDS 80+ Master Grubu">YDS 80+ Master Grubu (28 Öğrenci)</option>
                  <option value="IELTS Band 7.5 Kulübü">IELTS Band 7.5 Kulübü (15 Öğrenci)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#282e3e]">Ödev Kapsamı</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAssignmentScope("WEAKEST_TOPIC")}
                    className={`p-2.5 rounded-[8px] text-xs font-bold border text-left ${
                      assignmentScope === "WEAKEST_TOPIC"
                        ? "bg-[#edefff] border-[#4255ff] text-[#4255ff]"
                        : "bg-[#f6f7fb] border-[#d9dde8] text-[#586380]"
                    }`}
                  >
                    <div>⚠️ Sadece Zayıf Kazanım</div>
                    <div className="text-[10px] font-normal opacity-75">{selectedReport.weakestTopic}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssignmentScope("FULL")}
                    className={`p-2.5 rounded-[8px] text-xs font-bold border text-left ${
                      assignmentScope === "FULL"
                        ? "bg-[#edefff] border-[#4255ff] text-[#4255ff]"
                        : "bg-[#f6f7fb] border-[#d9dde8] text-[#586380]"
                    }`}
                  >
                    <div>📋 Tüm Deneme Tekrarı</div>
                    <div className="text-[10px] font-normal opacity-75">Tüm soruları yeniden çözdür</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#282e3e]">Teslim Tarihi</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-[8px] border border-[#d9dde8] bg-white text-[#282e3e]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#282e3e]">Minimum Geçme Notu</label>
                  <input
                    type="number"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="w-full text-xs p-2 rounded-[8px] border border-[#d9dde8] bg-white text-[#282e3e]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#d9dde8]">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 rounded-[200px] text-xs font-bold text-[#586380] hover:text-[#282e3e]"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Ödevi Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
