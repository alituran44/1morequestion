"use client";

import { useState, useRef } from "react";
import { 
  X, 
  BarChart2, 
  Users, 
  Clock, 
  Award, 
  Play, 
  Pause, 
  Volume2, 
  PenTool, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { ExamDetailedReport, StudentResultItem, AudioSubmission, SAMPLE_AUDIO_URI } from "@/lib/audio-and-reports";

interface ExamReportInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ExamDetailedReport | null;
  audioSubmissions?: AudioSubmission[];
}

export function ExamReportInspectionModal({
  isOpen,
  onClose,
  report,
  audioSubmissions = [],
}: ExamReportInspectionModalProps) {
  const [activeTab, setActiveTab] = useState<"STUDENTS" | "QUESTIONS" | "AUDIO">("STUDENTS");
  const [selectedStudentForEssay, setSelectedStudentForEssay] = useState<StudentResultItem | null>(null);
  
  // Audio playback state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen || !report) return null;

  const handlePlayAudio = (id: string, url: string) => {
    if (playingAudioId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play().catch(console.error);
      audio.onended = () => setPlayingAudioId(null);
      setPlayingAudioId(id);
    }
  };

  // Filter audio submissions related to this report
  const relatedAudios = audioSubmissions.filter(
    (aud) => aud.examCode === report.examCode || report.studentResults.some((s) => s.audioSubmissionId === aud.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-5xl bg-white border border-[#d9dde8] rounded-[16px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#d9dde8] bg-[#f6f7fb] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#edefff] text-[#4255ff] border border-[#d9dde8] font-bold">
                {report.examCode} • Kod: #{report.accessCode}
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                report.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}>
                {report.status === "COMPLETED" ? "✓ Tamamlandı" : "Canlı Oturum"}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#282e3e]">
              {report.title}
            </h3>
            <p className="text-xs text-[#586380]">
              Hedef Grup: <strong className="text-[#282e3e]">{report.targetClass}</strong> • Tarih: {report.hostedDate} • Katılımcı: {report.participantsCount} Öğrenci
            </p>
          </div>

          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-200 text-[#586380] hover:text-[#282e3e] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:px-6 bg-white border-b border-[#d9dde8]">
          <div className="p-3 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8]">
            <div className="text-[10px] font-bold uppercase text-[#586380]">Sınıf Ortalaması</div>
            <div className="text-sm sm:text-base font-bold text-[#4255ff]">{report.averageScore}</div>
          </div>
          <div className="p-3 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8]">
            <div className="text-[10px] font-bold uppercase text-[#586380]">En Zayıf Kazanım</div>
            <div className="text-xs sm:text-xs font-bold text-rose-600 truncate">{report.weakestTopic}</div>
          </div>
          <div className="p-3 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8]">
            <div className="text-[10px] font-bold uppercase text-[#586380]">En Güçlü Becerisi</div>
            <div className="text-xs sm:text-xs font-bold text-emerald-600 truncate">{report.strongestTopic}</div>
          </div>
          <div className="p-3 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8]">
            <div className="text-[10px] font-bold uppercase text-[#586380]">Ses / Essay Yanıtı</div>
            <div className="text-sm sm:text-base font-bold text-[#282e3e]">
              {report.audioCount} Ses • {report.essayCount} Essay
            </div>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#d9dde8] bg-[#f6f7fb]/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab("STUDENTS")}
            className={`text-xs px-4 py-2 rounded-t-[8px] font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "STUDENTS"
                ? "border-[#4255ff] text-[#4255ff] bg-white shadow-xs"
                : "border-transparent text-[#586380] hover:text-[#282e3e]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Öğrenci Karneleri ({report.studentResults.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("QUESTIONS")}
            className={`text-xs px-4 py-2 rounded-t-[8px] font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "QUESTIONS"
                ? "border-[#4255ff] text-[#4255ff] bg-white shadow-xs"
                : "border-transparent text-[#586380] hover:text-[#282e3e]"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Soru & Madde Analizi ({report.questionAnalysis.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("AUDIO")}
            className={`text-xs px-4 py-2 rounded-t-[8px] font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "AUDIO"
                ? "border-[#4255ff] text-[#4255ff] bg-white shadow-xs"
                : "border-transparent text-[#586380] hover:text-[#282e3e]"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Yüklenen Ses & Speaking Kayıtları ({relatedAudios.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: ÖĞRENCİLER */}
          {activeTab === "STUDENTS" && (
            <div className="space-y-3">
              <div className="overflow-x-auto border border-[#d9dde8] rounded-[8px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f6f7fb] border-b border-[#d9dde8] text-[#586380] font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Öğrenci</th>
                      <th className="py-2.5 px-3 text-center">Doğru / Yanlış</th>
                      <th className="py-2.5 px-3 text-center">Net / Puan</th>
                      <th className="py-2.5 px-3 text-center">Süre</th>
                      <th className="py-2.5 px-3 text-center">Speaking Ses</th>
                      <th className="py-2.5 px-3 text-center">Writing Essay</th>
                      <th className="py-2.5 px-3">Zayıf Konu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d9dde8]">
                    {report.studentResults.map((st) => (
                      <tr key={st.id} className="hover:bg-[#f6f7fb]/70 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#282e3e]">{st.studentName}</div>
                          <div className="text-[10px] text-[#586380]">{st.studentEmail}</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-emerald-700 font-bold">{st.correctCount} D</span>
                          <span className="text-[#939bb4] mx-1">/</span>
                          <span className="text-rose-700 font-bold">{st.wrongCount} Y</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full font-bold bg-[#edefff] text-[#4255ff]">
                            {st.scaledScore}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-[#586380]">
                          {st.timeSpentMins} dk
                        </td>
                        <td className="py-3 px-3 text-center">
                          {st.audioSubmissionId ? (
                            <button
                              onClick={() => handlePlayAudio(st.audioSubmissionId!, SAMPLE_AUDIO_URI)}
                              className={`px-2.5 py-1 rounded-[200px] text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border ${
                                playingAudioId === st.audioSubmissionId
                                  ? "bg-rose-500 text-white border-rose-500 shadow-xs"
                                  : "bg-[#edefff] text-[#4255ff] border-[#d9dde8] hover:bg-[#4255ff] hover:text-white"
                              }`}
                            >
                              {playingAudioId === st.audioSubmissionId ? (
                                <>
                                  <Pause className="w-3 h-3" />
                                  <span>Durdur</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3" />
                                  <span>{st.audioDurationSec}s • Dinle</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#939bb4]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {st.essayText ? (
                            <button
                              onClick={() => setSelectedStudentForEssay(st)}
                              className="px-2.5 py-1 rounded-[200px] text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <PenTool className="w-3 h-3" />
                              <span>{st.essayWordCount} K • Oku</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#939bb4]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1">
                            {st.weakTopics.map((wt, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 font-medium"
                              >
                                {wt.replace("Grammar::", "").replace("Vocabulary::", "")}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SORU MADDE ANALİZİ */}
          {activeTab === "QUESTIONS" && (
            <div className="space-y-3">
              <div className="p-3 rounded-[8px] bg-[#edefff] border border-[#d9dde8] text-xs text-[#282e3e] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4255ff] shrink-0" />
                <span>
                  <strong>Madde Analizi Raporu:</strong> Sınıfın %50'nin altına düştüğü kritik sorular için "1 Soru Daha" telafi modülü otomatik önerilir.
                </span>
              </div>

              <div className="overflow-x-auto border border-[#d9dde8] rounded-[8px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f6f7fb] border-b border-[#d9dde8] text-[#586380] font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Soru No</th>
                      <th className="py-2.5 px-3">Alan & Konu Başlığı</th>
                      <th className="py-2.5 px-3 text-center">Doğru Şık</th>
                      <th className="py-2.5 px-3 text-center">Başarı Oranı</th>
                      <th className="py-2.5 px-3">En Çok Düşülen Çeldirici</th>
                      <th className="py-2.5 px-3 text-center">Eylem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d9dde8]">
                    {report.questionAnalysis.map((q) => (
                      <tr key={q.questionNumber} className="hover:bg-[#f6f7fb]/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-[#282e3e]">Soru {q.questionNumber}</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-[#282e3e]">{q.subTopic}</span>
                          <span className="ml-1 text-[10px] text-[#586380]">({q.domain})</span>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-700">{q.correctAnswer}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            q.successPercentage < 40
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : q.successPercentage < 70
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}>
                            %{q.successPercentage}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-rose-600 font-semibold">{q.mostCommonWrongChoice}</td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#edefff] text-[#4255ff] font-bold cursor-pointer hover:underline">
                            +1 Soru Ata
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: YÜKLENEN SES & SPEAKING */}
          {activeTab === "AUDIO" && (
            <div className="space-y-3">
              {relatedAudios.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#586380] bg-[#f6f7fb] rounded-[8px] border border-[#d9dde8]">
                  Bu sınav oturumunda yüklenmiş ses kaydı bulunmamaktadır.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {relatedAudios.map((aud) => (
                    <div
                      key={aud.id}
                      className="p-4 rounded-[12px] bg-white border border-[#d9dde8] space-y-3 shadow-xs hover:border-[#4255ff] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-[#282e3e]">{aud.studentName}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#edefff] text-[#4255ff] font-bold">
                              Soru {aud.questionNumber}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#586380] line-clamp-1 mt-0.5">
                            {aud.promptTitle}
                          </p>
                        </div>

                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          Band {aud.aiScoreBand}
                        </span>
                      </div>

                      {/* Playable Bar */}
                      <div className="p-2.5 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center justify-between gap-3">
                        <button
                          onClick={() => handlePlayAudio(aud.id, aud.audioUrl)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            playingAudioId === aud.id
                              ? "bg-rose-500 text-white"
                              : "bg-[#4255ff] text-white hover:bg-[#3346e0]"
                          }`}
                        >
                          {playingAudioId === aud.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-[#282e3e] flex items-center justify-between">
                            <span>{playingAudioId === aud.id ? "Ses Oynatılıyor..." : "Öğrenci Kaydı"}</span>
                            <span>{aud.durationSec} Saniye</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className={`h-full bg-[#4255ff] ${playingAudioId === aud.id ? "animate-pulse w-3/4" : "w-0"}`} />
                          </div>
                        </div>
                      </div>

                      {/* Rubric Breakdown */}
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] pt-1 border-t border-[#d9dde8]">
                        <div className="p-1 rounded bg-[#f6f7fb]">
                          <span className="text-[#586380] block text-[9px]">Telaffuz</span>
                          <strong className="text-[#282e3e]">{aud.rubric.pronunciation}</strong>
                        </div>
                        <div className="p-1 rounded bg-[#f6f7fb]">
                          <span className="text-[#586380] block text-[9px]">Akıcılık</span>
                          <strong className="text-[#282e3e]">{aud.rubric.fluency}</strong>
                        </div>
                        <div className="p-1 rounded bg-[#f6f7fb]">
                          <span className="text-[#586380] block text-[9px]">Kelime</span>
                          <strong className="text-[#282e3e]">{aud.rubric.vocabulary}</strong>
                        </div>
                        <div className="p-1 rounded bg-[#f6f7fb]">
                          <span className="text-[#586380] block text-[9px]">Gramer</span>
                          <strong className="text-[#282e3e]">{aud.rubric.grammar}</strong>
                        </div>
                      </div>

                      {/* AI Feedback */}
                      <p className="text-[11px] text-[#586380] italic bg-[#f6f7fb] p-2 rounded-[6px] border border-[#d9dde8]">
                        "{aud.aiFeedback}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#d9dde8] bg-[#f6f7fb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#586380]">
            Rapor ID: <strong>{report.id}</strong> • Oturum Kodu: <strong className="text-[#4255ff]">#{report.accessCode}</strong>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => alert(`Rapor PDF olarak indiriliyor: ${report.title}`)}
              className="px-4 py-2 rounded-[200px] bg-white border border-[#d9dde8] hover:border-[#4255ff] text-[#282e3e] hover:text-[#4255ff] text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Rapor İndir</span>
            </button>

            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                onClose();
              }}
              className="px-5 py-2 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>

      {/* Essay Detail Sub-Modal */}
      {selectedStudentForEssay && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-[12px] p-6 border border-[#d9dde8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#d9dde8] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[#282e3e] flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-purple-600" />
                  Öğrenci Essay Yanıtı: {selectedStudentForEssay.studentName}
                </h4>
                <p className="text-[11px] text-[#586380]">
                  Kelime Sayısı: {selectedStudentForEssay.essayWordCount} • Not: {selectedStudentForEssay.scaledScore}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForEssay(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8] text-xs text-[#282e3e] leading-relaxed max-h-60 overflow-y-auto">
              "{selectedStudentForEssay.essayText}"
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStudentForEssay(null)}
                className="px-4 py-2 rounded-[200px] bg-[#4255ff] text-white text-xs font-bold cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
