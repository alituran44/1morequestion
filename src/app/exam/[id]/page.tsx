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
  RotateCcw
} from "lucide-react";

interface ExamQuestion {
  id: string;
  number: number;
  content: string;
  passage?: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  cefrLevel: string;
  subTopic: string;
}

export default function ExamRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const examId = (params?.id as string) || "mock-1";

  // Demo 5-question test for interactive simulation
  const questions: ExamQuestion[] = [
    {
      id: "q-1",
      number: 1,
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
      content: "She made a significant ______ to the research project by analyzing all the collected historical archives.",
      options: [
        { key: "A", text: "contribution" },
        { key: "B", text: "complaint" },
        { key: "C", text: "hesitation" },
        { key: "D", text: "destruction" },
        { key: "E", text: "precaution" },
      ],
      correctKey: "A",
      explanation: "'Make a contribution to' sabit bir eşdizimdir (collocation).",
      cefrLevel: "B1",
      subTopic: "Collocations",
    },
    {
      id: "q-4",
      number: 4,
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
    {
      id: "q-5",
      number: 5,
      content: "Hardly ______ the presentation when the fire alarm began ringing incessantly.",
      options: [
        { key: "A", text: "had the professor started" },
        { key: "B", text: "the professor started" },
        { key: "C", text: "did the professor start" },
        { key: "D", text: "has the professor started" },
        { key: "E", text: "starts the professor" },
      ],
      correctKey: "A",
      explanation: "'Hardly ... when' yapısında devrik cümle (Inversion) ve Past Perfect kullanılır.",
      cefrLevel: "C1",
      subTopic: "Inversion",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    let wrongCount = 0;
    const weakTopics: string[] = [];

    questions.forEach((q) => {
      const ans = answers[q.number];
      if (ans === q.correctKey) {
        correctCount++;
      } else if (ans) {
        wrongCount++;
        weakTopics.push(q.subTopic);
      }
    });

    const net = Math.max(0, correctCount - wrongCount * 0.25);
    return { correctCount, wrongCount, net, weakTopics };
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="px-6 py-4 border-b border-slate-800 bg-[#0d131f] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="text-sm font-extrabold text-slate-100">
              2026 YDT Şampiyonlar Özgün Deneme #1
            </div>
            <div className="text-[11px] text-slate-400">
              Soru {currentIndex + 1} / {questions.length} • Ulusal Sınav Simülatörü
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-sm font-extrabold text-sky-400">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!isFinished && (
            <button
              onClick={() => setIsFinished(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all shadow-md shadow-rose-950"
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
            <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Question Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Soru {currentQ.number} • {currentQ.subTopic}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {currentQ.cefrLevel}
                </span>
              </div>

              {/* Optional Passage */}
              {currentQ.passage && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                  {currentQ.passage}
                </div>
              )}

              {/* Question Content */}
              <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                {currentQ.content}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.number] === opt.key;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? "bg-sky-600/20 border-sky-500 text-sky-200 ring-1 ring-sky-500 font-semibold"
                          : "bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-200"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isSelected
                            ? "bg-sky-600 border-sky-400 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Önceki Soru</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-950 flex items-center gap-2"
                  >
                    <span>Sonraki Soru</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFinished(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950"
                  >
                    Sınavı Bitir ve Karneni Gör
                  </button>
                )}
              </div>
            </div>

            {/* Right: Optical Sheet Grid (4 cols) */}
            <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-slate-300">
                <span>Optik Form / Hızlı Geçiş</span>
                <span className="text-[11px] text-slate-500">
                  {Object.keys(answers).length}/{questions.length} İşaretlendi
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.number];
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.number}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl text-xs font-bold transition-all border ${
                        isCurrent
                          ? "ring-2 ring-sky-500 bg-sky-600 text-white border-sky-400"
                          : isAnswered
                          ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-600/40 border border-emerald-500" />
                  <span>Cevaplandı</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-900 border border-slate-800" />
                  <span>Boş Bırakıldı</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sınav Karnesi & Teşhis Ekranı (Diagnostic Report) */
          (() => {
            const res = calculateResults();
            return (
              <div className="max-w-2xl mx-auto w-full bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-sky-950">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-100">Sınav Tamamlandı!</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    2026 YDT Şampiyonlar Özgün Deneme #1 Karne & Teşhis Raporu
                  </p>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-500 font-bold">Doğru</div>
                    <div className="text-xl font-black text-emerald-400">{res.correctCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold">Yanlış</div>
                    <div className="text-xl font-black text-rose-400">{res.wrongCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold">Net Skor</div>
                    <div className="text-xl font-black text-sky-400">{res.net.toFixed(2)} Net</div>
                  </div>
                </div>

                {/* Weak Topic Identified & "1 Soru Daha" Hook */}
                {res.weakTopics.length > 0 && (
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles className="w-4 h-4" />
                      <span>Tespit Edilen En Zayıf Kazanım: {res.weakTopics[0]}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sınav analizine göre bu konuda net kaybı yaşadınız. Şimdi adaptif havuzdan <strong>1 Soru Daha</strong> çözerek bu açığı hemen kapatın!
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Ana Sayfaya Dön
                  </Link>

                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-sky-950 flex items-center gap-2"
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
