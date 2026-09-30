"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Sparkles, 
  Flame,
  RotateCcw,
  Mic,
  PenTool,
  BookOpen,
  Volume2,
  FileText,
  Play
} from "lucide-react";
import { SpeakingAudioRecorder, AudioRecordedData } from "@/components/SpeakingAudioRecorder";

export type QuestionType = "MULTIPLE_CHOICE" | "SPEAKING" | "WRITING";

export interface ExamQuestion {
  id: string;
  number: number;
  type: QuestionType;
  skillDomain: "READING" | "WRITING" | "SPEAKING" | "GRAMMAR_VOCAB" | "LISTENING";
  content: string;
  passage?: string;
  speakingPrompt?: {
    prepTimeSec: number;
    maxRecordSec: number;
    bulletPoints: string[];
  };
  writingPrompt?: {
    minWords: number;
    recommendedMins: number;
    taskType: string;
  };
  options?: { key: string; text: string }[];
  correctKey?: string;
  explanation: string;
  cefrLevel: string;
  subTopic: string;
}

export default function ExamRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const examId = (params?.id as string) || "mock-1";

  // Comprehensive multi-skill question set matching real exam specifications
  const questions: ExamQuestion[] = [
    {
      id: "q-1",
      number: 1,
      type: "MULTIPLE_CHOICE",
      skillDomain: "GRAMMAR_VOCAB",
      content: "If the government ______ stricter regulations earlier, the environmental crisis could have been mitigated significantly.",
      options: [
        { key: "A", text: "had implemented" },
        { key: "B", text: "implements" },
        { key: "C", text: "would implement" },
        { key: "D", text: "has implemented" },
        { key: "E", text: "were to implement" },
      ],
      correctKey: "A",
      explanation: "Type 3 Conditionals: Geçmişte gerçekleşmeyen durumlar için 'had + V3' kullanılır.",
      cefrLevel: "B2",
      subTopic: "Conditionals",
    },
    {
      id: "q-2",
      number: 2,
      type: "MULTIPLE_CHOICE",
      skillDomain: "GRAMMAR_VOCAB",
      content: "Scientists are persistently trying to ______ the underlying factors that trigger sudden neurological degradation.",
      options: [
        { key: "A", text: "figure out" },
        { key: "B", text: "look down on" },
        { key: "C", text: "put up with" },
        { key: "D", text: "run out of" },
        { key: "E", text: "make do with" },
      ],
      correctKey: "A",
      explanation: "'Figure out' (anlamak, çözmek) bağlama tam oturmaktadır.",
      cefrLevel: "C1",
      subTopic: "Phrasal_Verbs",
    },
    {
      id: "q-3",
      number: 3,
      type: "SPEAKING",
      skillDomain: "SPEAKING",
      content: "IELTS / TOEFL Speaking Task: Describe a technological advancement that has significantly transformed modern language learning.",
      speakingPrompt: {
        prepTimeSec: 30,
        maxRecordSec: 120,
        bulletPoints: [
          "What the technology is and when you first encountered it",
          "How it helps students acquire new vocabulary and pronunciation",
          "What advantages and disadvantages it brings compared to traditional teachers",
          "And explain whether you believe AI will completely replace human instructors in the future"
        ]
      },
      explanation: "Speaking kriterleri: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, ve Pronunciation.",
      cefrLevel: "C1",
      subTopic: "Speaking_Task2",
    },
    {
      id: "q-4",
      number: 4,
      type: "WRITING",
      skillDomain: "WRITING",
      content: "Writing Task 2 (Academic Essay): Some people argue that university education should be completely funded by the state for all citizens, while others maintain that students should bear tuition fees. Discuss both views and state your personal stance with relevant examples.",
      writingPrompt: {
        minWords: 150,
        recommendedMins: 40,
        taskType: "Discuss Both Views & Opinion Essay"
      },
      explanation: "Writing kriterleri: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Accuracy.",
      cefrLevel: "C1",
      subTopic: "Academic_Writing",
    },
    {
      id: "q-5",
      number: 5,
      type: "MULTIPLE_CHOICE",
      skillDomain: "READING",
      passage: "While renewable energy sources have gained remarkable momentum across developing economies, grid modernization remains an elusive goal due to prohibitive infrastructure costs.",
      content: "According to the passage, what is the primary bottleneck preventing the full integration of renewables?",
      options: [
        { key: "A", text: "Lack of public interest in sustainability" },
        { key: "B", text: "Exorbitant financial expenditures needed for grid infrastructure" },
        { key: "C", text: "Inadequate generation of solar and wind power" },
        { key: "D", text: "Geopolitical restrictions on technology export" },
      ],
      correctKey: "B",
      explanation: "'Prohibitive infrastructure costs' (fahiş altyapı maliyeti) ile 'Exorbitant financial expenditures' eş anlamlıdır.",
      cefrLevel: "C1",
      subTopic: "Inference",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [audioRecords, setAudioRecords] = useState<Record<number, AudioRecordedData>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>({
    4: "In the contemporary globalized era, tertiary education serves as a pivotal cornerstone for both socioeconomic mobility and national competitiveness. While advocates of tuition-free higher education emphasize egalitarian access, opponents contend that private contributions incentivize academic diligence and institutional autonomy. In my perspective, a hybrid model encompassing state subsidies for low-income scholars alongside income-contingent loans offers the most equitable solution."
  });

  const [timeLeft, setTimeLeft] = useState(7200); // 120 mins
  const [isFinished, setIsFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (key: string) => {
    setAnswers({ ...answers, [currentQ.number]: key });
  };

  const handleAudioSaved = (data: AudioRecordedData) => {
    setAudioRecords((prev) => ({ ...prev, [currentQ.number]: data }));
    setAnswers((prev) => ({ ...prev, [currentQ.number]: `AUDIO_ATTACHED:${data.durationSec}s` }));
  };

  const handleWritingChange = (text: string) => {
    setWrittenAnswers((prev) => ({ ...prev, [currentQ.number]: text }));
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 10) {
      setAnswers((prev) => ({ ...prev, [currentQ.number]: `WRITING_COMPLETED:${wordCount}_words` }));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Calculate results
  const calculateResults = () => {
    let mcCorrect = 0;
    let mcWrong = 0;
    const weakTopics: string[] = [];

    questions.forEach((q) => {
      if (q.type === "MULTIPLE_CHOICE" && q.correctKey) {
        const ans = answers[q.number];
        if (ans === q.correctKey) {
          mcCorrect++;
        } else if (ans) {
          mcWrong++;
          weakTopics.push(q.subTopic);
        }
      }
    });

    const net = Math.max(0, mcCorrect - mcWrong * 0.25);
    const speakingSubmitted = !!audioRecords[3];
    const writingSubmitted = (writtenAnswers[4]?.trim().split(/\s+/).filter(Boolean).length || 0) >= 50;

    return { 
      mcCorrect, 
      mcWrong, 
      net, 
      weakTopics, 
      speakingSubmitted, 
      writingSubmitted,
      speakingScoreBand: speakingSubmitted ? 7.5 : 0,
      writingScoreBand: writingSubmitted ? 7.0 : 0
    };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Bar */}
      <header className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="text-sm font-extrabold text-slate-900">
              2026 Master Sınav Simülatörü & Çoklu Beceri Değerlendirmesi
            </div>
            <div className="text-[11px] text-slate-500">
              Soru {currentIndex + 1} / {questions.length} • Okuma, Yazma, Konuşma & Gramer
            </div>
          </div>
        </div>

        {/* Timer & Finish Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-sm font-extrabold text-slate-900 shadow-xs">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!isFinished && (
            <button
              onClick={() => setIsFinished(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all shadow-xs cursor-pointer"
            >
              Sınavı Bitir
            </button>
          )}
        </div>
      </header>

      {/* Main Runner Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
        {!isFinished ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Question Card (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question Badge & Skill Identifier */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Soru {currentQ.number} • {currentQ.subTopic}
                  </span>
                  {currentQ.type === "SPEAKING" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold flex items-center gap-1">
                      <Mic className="w-3 h-3 text-amber-600" />
                      Speaking Ses Kaydı
                    </span>
                  )}
                  {currentQ.type === "WRITING" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-bold flex items-center gap-1">
                      <PenTool className="w-3 h-3 text-purple-600" />
                      Writing Kompozisyon
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {currentQ.cefrLevel}
                </span>
              </div>

              {/* Optional Passage */}
              {currentQ.passage && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                  {currentQ.passage}
                </div>
              )}

              {/* Question Prompt Content */}
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                {currentQ.content}
              </p>

              {/* 1. TYPE: MULTIPLE CHOICE */}
              {currentQ.type === "MULTIPLE_CHOICE" && currentQ.options && (
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = answers[currentQ.number] === opt.key;

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(opt.key)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? "bg-amber-50/80 border-amber-500 text-slate-950 ring-2 ring-amber-500 font-bold shadow-xs"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isSelected
                              ? "bg-amber-500 border-amber-600 text-slate-950 font-black"
                              : "bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. TYPE: SPEAKING WITH LIVE AUDIO RECORDING */}
              {currentQ.type === "SPEAKING" && currentQ.speakingPrompt && (
                <div className="space-y-4">
                  {/* Prompt Cue Card */}
                  <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Speaking Cue Card Görev Maddeleri:</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      {currentQ.speakingPrompt.bulletPoints.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Audio Recorder Integration */}
                  <SpeakingAudioRecorder
                    questionNumber={currentQ.number}
                    promptTitle={currentQ.content}
                    preparationSec={currentQ.speakingPrompt.prepTimeSec}
                    maxRecordingSec={currentQ.speakingPrompt.maxRecordSec}
                    existingAudioUrl={audioRecords[currentQ.number]?.url || null}
                    onAudioSaved={handleAudioSaved}
                    onAudioDeleted={() => {
                      const newRecords = { ...audioRecords };
                      delete newRecords[currentQ.number];
                      setAudioRecords(newRecords);
                      const newAnswers = { ...answers };
                      delete newAnswers[currentQ.number];
                      setAnswers(newAnswers);
                    }}
                  />
                </div>
              )}

              {/* 3. TYPE: WRITING WITH LIVE WORD COUNTER */}
              {currentQ.type === "WRITING" && currentQ.writingPrompt && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Hedef: Minimum <strong>{currentQ.writingPrompt.minWords} kelime</strong></span>
                    <span>
                      Yazılan: <strong className={`font-bold ${
                        (writtenAnswers[currentQ.number]?.trim().split(/\s+/).filter(Boolean).length || 0) >= currentQ.writingPrompt.minWords
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}>
                        {writtenAnswers[currentQ.number]?.trim().split(/\s+/).filter(Boolean).length || 0} kelime
                      </strong>
                    </span>
                  </div>

                  <textarea
                    rows={8}
                    value={writtenAnswers[currentQ.number] || ""}
                    onChange={(e) => handleWritingChange(e.target.value)}
                    placeholder="Akademik essay cevabınızı buraya yazınız (Paragraflara bölerek giriş, gelişme ve sonuç oluşturun)..."
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-xs sm:text-sm text-slate-900 leading-relaxed placeholder-slate-400 font-sans shadow-xs"
                  />

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>💡 İpucu: Formal bağlaçlar (Furthermore, Conversely, Consequently) kullanın.</span>
                    <span className="font-semibold text-slate-700">Otomatik Taslak Kaydı Aktif</span>
                  </div>
                </div>
              )}

              {/* Bottom Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Önceki Soru</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Sonraki Soru</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFinished(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
                  >
                    Sınavı Bitir ve Karneni Gör
                  </button>
                )}
              </div>
            </div>

            {/* Right: Optical Sheet Grid & Multi-Skill Status (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-bold text-slate-900">
                <span>Optik Form / Beceri Haritası</span>
                <span className="text-[11px] text-slate-500">
                  {Object.keys(answers).length}/{questions.length} Tamamlandı
                </span>
              </div>

              {/* Question numbers with skill icons */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.number];
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.number}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center cursor-pointer ${
                        isCurrent
                          ? "ring-2 ring-amber-500 bg-amber-500 text-slate-950 border-amber-500 font-black shadow-xs"
                          : isAnswered
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <span className="text-xs leading-none">{q.number}</span>
                      <span className="text-[9px] mt-0.5 opacity-80">
                        {q.type === "SPEAKING" ? "🎙️" : q.type === "WRITING" ? "✍️" : "🔤"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Skills summary checklist */}
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Beceri Dağılımı Durumu
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span>🔤</span> Çoktan Seçmeli (Soru 1, 2, 5)
                    </span>
                    <span className="font-bold text-slate-900">
                      {[answers[1], answers[2], answers[5]].filter(Boolean).length}/3
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Mic className="w-3 h-3 text-amber-600" /> Speaking (Soru 3 Ses)
                    </span>
                    <span className={`font-bold ${audioRecords[3] ? "text-emerald-600" : "text-amber-600"}`}>
                      {audioRecords[3] ? "Kaydedildi" : "Bekleniyor"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <PenTool className="w-3 h-3 text-purple-600" /> Writing (Soru 4 Essay)
                    </span>
                    <span className={`font-bold ${writtenAnswers[4] ? "text-emerald-600" : "text-slate-400"}`}>
                      {writtenAnswers[4] ? "Yazıldı" : "Boş"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sınav Karnesi & Teşhis Ekranı (Multi-skill Diagnostic Report) */
          (() => {
            const res = calculateResults();
            return (
              <div className="max-w-3xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto text-slate-950 shadow-xs">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900">Sınav Değerlendirmesi Tamamlandı!</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Okuma, Gramer, Speaking Ses Kaydı ve Writing Kompozisyon Karnesi
                  </p>
                </div>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold">Çoktan Seçmeli Net</div>
                    <div className="text-xl font-black text-slate-900 mt-0.5">{res.net.toFixed(2)} Net</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold">Doğru / Yanlış</div>
                    <div className="text-xl font-black text-emerald-700 mt-0.5">{res.mcCorrect}D / {res.mcWrong}Y</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold">Speaking Skoru</div>
                    <div className="text-xl font-black text-amber-600 mt-0.5">Band {res.speakingScoreBand}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-bold">Writing Skoru</div>
                    <div className="text-xl font-black text-purple-700 mt-0.5">Band {res.writingScoreBand}</div>
                  </div>
                </div>

                {/* Speaking Submission Review Box with Audio Playback */}
                {audioRecords[3] && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                          <Mic className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          Kaydettiğiniz Speaking Sınav Yanıtı (Soru 3)
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        {audioRecords[3].durationSec} Sn Ses Kaydedildi
                      </span>
                    </div>

                    <audio
                      src={audioRecords[3].url}
                      controls
                      className="w-full h-10 rounded-xl"
                    />

                    {/* AI Speaking Rubric */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                      <div className="p-2 rounded-xl bg-slate-50">
                        <div className="text-[10px] text-slate-500 font-bold">Telaffuz (Pronunciation)</div>
                        <div className="text-xs font-black text-slate-900">7.5 / 9.0</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50">
                        <div className="text-[10px] text-slate-500 font-bold">Akıcılık (Fluency)</div>
                        <div className="text-xs font-black text-slate-900">8.0 / 9.0</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50">
                        <div className="text-[10px] text-slate-500 font-bold">Kelime (Vocabulary)</div>
                        <div className="text-xs font-black text-slate-900">7.0 / 9.0</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50">
                        <div className="text-[10px] text-slate-500 font-bold">Gramer Uyumu</div>
                        <div className="text-xs font-black text-slate-900">7.5 / 9.0</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Writing Submission Review Box */}
                {writtenAnswers[4] && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                          <PenTool className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          Yazdığınız Essay (Soru 4)
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {writtenAnswers[4].trim().split(/\s+/).filter(Boolean).length} Kelime
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{writtenAnswers[4]}"
                    </p>
                  </div>
                )}

                {/* Weak Topic Identified & "1 Soru Daha" Hook */}
                {res.weakTopics.length > 0 && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Tespit Edilen En Zayıf Kazanım: {res.weakTopics[0]}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Sınav analizine göre bu konuda puan kaybı yaşadınız. Şimdi adaptif havuzdan <strong>1 Soru Daha</strong> çözerek bu açığı hemen kapatın!
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    href="/student"
                    className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-xs"
                  >
                    Öğrenci Paneline Dön
                  </Link>

                  <Link
                    href="/student"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs flex items-center gap-2"
                  >
                    <span>1 Soru Daha Çöz</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })()
        )}
      </main>
    </div>
  );
}
