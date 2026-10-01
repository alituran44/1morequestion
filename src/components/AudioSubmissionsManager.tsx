"use client";

import { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  GraduationCap, 
  Award,
  Send,
  Check,
  RotateCcw
} from "lucide-react";
import { AudioSubmission, INITIAL_AUDIO_SUBMISSIONS, SAMPLE_AUDIO_URI } from "@/lib/audio-and-reports";

interface AudioSubmissionsManagerProps {
  title?: string;
  subtitle?: string;
  role?: "INSTRUCTOR" | "ADMIN";
}

export function AudioSubmissionsManager({
  title = "Yüklenen Ses & Speaking Kayıtları Denetim Masası",
  subtitle = "Öğrencilerin hazırlık atlama ve speaking mülakatları için sisteme yükledikleri ses kayıtlarını dinleyin, yapay zeka puanlamasını denetleyin.",
  role = "INSTRUCTOR",
}: AudioSubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState<AudioSubmission[]>(INITIAL_AUDIO_SUBMISSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>("ALL");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (id: string, url: string) => {
    if (playingAudioId === id) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(url || SAMPLE_AUDIO_URI);
      audioRef.current = audio;
      audio.play().catch(console.error);
      audio.onended = () => setPlayingAudioId(null);
      setPlayingAudioId(id);
    }
  };

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "APPROVED", instructorNote: `${role === "ADMIN" ? "Admin" : "Eğitmen"} tarafından onaylandı.` } : sub
      )
    );
    showToast("Ses kaydı başarıyla onaylandı.");
  };

  const handleSaveNote = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, instructorNote: noteInput, status: "GRADED" } : sub
      )
    );
    setEditingNoteId(null);
    showToast("Eğitmen geri bildirimi kaydedildi.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = submissions.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.targetUniversity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam =
      selectedExamFilter === "ALL" || sub.examCode === selectedExamFilter;

    return matchesSearch && matchesExam;
  });

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 rounded-[8px] bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#282e3e] flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#4255ff]" />
              {title}
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#edefff] text-[#4255ff] border border-[#d9dde8] font-bold">
              {filtered.length} Kayıt
            </span>
          </div>
          <p className="text-xs text-[#586380] mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#939bb4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Öğrenci veya üniversite ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-[200px] border border-[#d9dde8] bg-white focus:outline-none focus:border-[#4255ff] text-[#282e3e] w-48 sm:w-56"
            />
          </div>

          <select
            value={selectedExamFilter}
            onChange={(e) => setSelectedExamFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-[200px] border border-[#d9dde8] bg-white font-semibold text-[#282e3e] focus:outline-none focus:border-[#4255ff]"
          >
            <option value="ALL">Tüm Sınavlar</option>
            <option value="BUEPT">Boğaziçi BUEPT</option>
            <option value="ODTU_IYS">ODTÜ EPE</option>
            <option value="BILKENT_PAE">Bilkent PAE</option>
            <option value="KOC_KUEPE">Koç KUEPE</option>
            <option value="IELTS">IELTS Speaking</option>
          </select>
        </div>
      </div>

      {/* Submissions List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-[12px] bg-white border border-[#d9dde8] hover:border-[#4255ff] transition-all shadow-xs space-y-3.5"
          >
            {/* Top row: Student & Target Info */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#282e3e]">{item.studentName}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#f6f7fb] text-[#586380] border border-[#d9dde8] font-bold">
                    {item.targetUniversity}
                  </span>
                </div>
                <div className="text-[11px] text-[#586380]">{item.studentEmail}</div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Band {item.aiScoreBand}
                </span>
                <div className="text-[10px] text-[#939bb4] mt-0.5">{item.submittedAt}</div>
              </div>
            </div>

            {/* Prompt context */}
            <div className="p-2.5 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8] space-y-1">
              <div className="text-[10px] font-bold text-[#4255ff] uppercase flex items-center gap-1">
                <Mic className="w-3 h-3" />
                Soru {item.questionNumber}: {item.examTitle}
              </div>
              <p className="text-xs text-[#282e3e] font-medium leading-relaxed">
                "{item.promptTitle}"
              </p>
            </div>

            {/* Playable Audio Strip */}
            <div className="p-3 rounded-[8px] bg-[#edefff]/70 border border-[#d9dde8] flex items-center justify-between gap-3">
              <button
                onClick={() => handlePlay(item.id, item.audioUrl)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs ${
                  playingAudioId === item.id
                    ? "bg-rose-600 text-white"
                    : "bg-[#4255ff] hover:bg-[#3346e0] text-white"
                }`}
              >
                {playingAudioId === item.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#282e3e]">
                    {playingAudioId === item.id ? "Ses Kaydı Çalınıyor..." : "Öğrenci Yanıtını Dinle"}
                  </span>
                  <span className="font-mono text-[#586380] text-[10px]">
                    {item.durationSec} Saniye
                  </span>
                </div>
                <div className="w-full bg-[#d9dde8] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[#4255ff] transition-all ${
                      playingAudioId === item.id ? "w-2/3 animate-pulse" : "w-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 4 Rubric Scores */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] pt-1 border-t border-[#d9dde8]">
              <div className="p-1.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8]">
                <span className="text-[#586380] block text-[9px]">Telaffuz</span>
                <strong className="text-[#282e3e] font-bold">{item.rubric.pronunciation} / 9</strong>
              </div>
              <div className="p-1.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8]">
                <span className="text-[#586380] block text-[9px]">Akıcılık</span>
                <strong className="text-[#282e3e] font-bold">{item.rubric.fluency} / 9</strong>
              </div>
              <div className="p-1.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8]">
                <span className="text-[#586380] block text-[9px]">Kelime</span>
                <strong className="text-[#282e3e] font-bold">{item.rubric.vocabulary} / 9</strong>
              </div>
              <div className="p-1.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8]">
                <span className="text-[#586380] block text-[9px]">Gramer</span>
                <strong className="text-[#282e3e] font-bold">{item.rubric.grammar} / 9</strong>
              </div>
            </div>

            {/* AI Feedback Quote */}
            <p className="text-xs text-[#586380] italic bg-[#f6f7fb] p-2.5 rounded-[8px] border border-[#d9dde8] leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-[#4255ff] inline mr-1" />
              "{item.aiFeedback}"
            </p>

            {/* Instructor / Admin Review Note */}
            {item.instructorNote && editingNoteId !== item.id && (
              <div className="text-xs text-[#282e3e] bg-amber-50/70 p-2.5 rounded-[8px] border border-amber-200 leading-relaxed">
                <strong className="text-amber-900 font-bold">Eğitmen Notu:</strong> {item.instructorNote}
              </div>
            )}

            {/* Note Editor */}
            {editingNoteId === item.id ? (
              <div className="space-y-2 pt-1 border-t border-[#d9dde8]">
                <textarea
                  rows={2}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Öğrenciye iletilecek eğitmen geri bildirimini yazın..."
                  className="w-full text-xs p-2 rounded-[8px] border border-[#4255ff] focus:outline-none text-[#282e3e] bg-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingNoteId(null)}
                    className="px-3 py-1 rounded-[200px] text-xs text-[#586380] hover:text-[#282e3e]"
                  >
                    Vazgeç
                  </button>
                  <button
                    onClick={() => handleSaveNote(item.id)}
                    className="px-3 py-1 rounded-[200px] bg-[#4255ff] text-white text-xs font-bold cursor-pointer"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-1 border-t border-[#d9dde8]">
                <button
                  onClick={() => {
                    setEditingNoteId(item.id);
                    setNoteInput(item.instructorNote || "");
                  }}
                  className="text-xs font-bold text-[#4255ff] hover:underline cursor-pointer"
                >
                  {item.instructorNote ? "Notu Düzenle" : "+ Eğitmen Notu Ekle"}
                </button>

                <div className="flex items-center gap-2">
                  {item.status !== "APPROVED" ? (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-3.5 py-1.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Onayla</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Onaylandı
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
