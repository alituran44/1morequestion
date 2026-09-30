"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Swords, 
  Trophy, 
  Flame, 
  Zap, 
  Clock, 
  Shield, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Sparkles,
  Volume2,
  Users,
  Award,
  ChevronRight,
  HelpCircle
} from "lucide-react";

interface DuelQuestion {
  id: string;
  subTopic: string;
  cefrLevel: string;
  question: string;
  passage?: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

const DUEL_QUESTIONS: DuelQuestion[] = [
  {
    id: "dq-1",
    subTopic: "Grammar::Conditionals",
    cefrLevel: "B2",
    question: "______ the emergency protocols had been strictly enforced by the authority, the catastrophic system failure would not have occurred.",
    options: [
      { key: "A", text: "Unless" },
      { key: "B", text: "Had" },
      { key: "C", text: "Should" },
      { key: "D", text: "Provided that" },
      { key: "E", text: "Even if" }
    ],
    correctKey: "B",
    explanation: "Type 3 conditional devrik yapıdır: 'Had + subject + V3' yapısı 'If + had + V3' anlamındadır ve ana cümlede 'would have V3' ile eşleşir."
  },
  {
    id: "dq-2",
    subTopic: "Vocabulary::Phrasal_Verbs",
    cefrLevel: "C1",
    question: "The economic committee had to ______ the scheduled plenary debate until all macroeconomic metrics were thoroughly audited.",
    options: [
      { key: "A", text: "put off" },
      { key: "B", text: "take after" },
      { key: "C", text: "carry out" },
      { key: "D", text: "break into" },
      { key: "E", text: "look down on" }
    ],
    correctKey: "A",
    explanation: "'Put off' ertelemek (postpone/delay) anlamına gelir. Cümledeki 'until all metrics were audited' ertelenmeyi gerektirir."
  },
  {
    id: "dq-3",
    subTopic: "Grammar::Inversion",
    cefrLevel: "C1",
    question: "Seldom ______ such an intricate synthesis of ancient rhetoric and contemporary computational linguistics in a single dissertation.",
    options: [
      { key: "A", text: "we have witnessed" },
      { key: "B", text: "have we witnessed" },
      { key: "C", text: "we witnessed" },
      { key: "D", text: "witnessed we" },
      { key: "E", text: "had we witness" }
    ],
    correctKey: "B",
    explanation: "'Seldom' gibi olumsuz zarflar cümle başına geldiğinde devrik cümle (auxiliary + subject + verb) gerektirir: 'have we witnessed'."
  },
  {
    id: "dq-4",
    subTopic: "Reading::Contextual_Vocabulary",
    cefrLevel: "C1",
    question: "The newly released clinical trial data aims to ______ the prevailing skepticism regarding the vaccine's efficacy against novel strains.",
    options: [
      { key: "A", text: "exacerbate" },
      { key: "B", text: "dispel" },
      { key: "C", text: "provoke" },
      { key: "D", text: "hinder" },
      { key: "E", text: "replicate" }
    ],
    correctKey: "B",
    explanation: "'Dispel' şüpheleri, korkuları dağıtmak veya yok etmek (eliminate/scatter doubts) demektir."
  },
  {
    id: "dq-5",
    subTopic: "Grammar::Conjunctions",
    cefrLevel: "B2",
    question: "The urban development initiative was approved ______ strong objections from several environmental conservation alliances.",
    options: [
      { key: "A", text: "notwithstanding" },
      { key: "B", text: "in order that" },
      { key: "C", text: "as though" },
      { key: "D", text: "in case" },
      { key: "E", text: "lest" }
    ],
    correctKey: "A",
    explanation: "'Notwithstanding' (-e rağmen / despite), arkasından isim öbeği alan zıtlık bildiren edattır."
  }
];

export default function DuelArenaPage() {
  const params = useParams();
  const router = useRouter();
  const code = (params?.code as string) || "904182";

  // Game Phases: 'LOBBY' | 'COUNTDOWN' | 'BATTLE' | 'RESULT'
  const [phase, setPhase] = useState<"LOBBY" | "COUNTDOWN" | "BATTLE" | "RESULT">("LOBBY");
  const [countdown, setCountdown] = useState(3);

  // Player 1 (User) State
  const [playerScore, setPlayerScore] = useState(0);
  const [playerStreak, setPlayerStreak] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<{ [qIndex: number]: { selected: string; correct: boolean; score: number } }>({});

  // Player 2 (Opponent) State - dynamic AI / peer simulation
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentStreak, setOpponentStreak] = useState(0);
  const [opponentStatus, setOpponentStatus] = useState<"THINKING" | "ANSWERED" | "IDLE">("THINKING");
  const [opponentAnswers, setOpponentAnswers] = useState<{ [qIndex: number]: { selected: string; correct: boolean; score: number } }>({});

  // Round State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [roundLocked, setRoundLocked] = useState(false);

  // Power-ups
  const [powerupDouble, setPowerupDouble] = useState(false);
  const [powerupFreeze, setPowerupFreeze] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [powerupsUsed, setPowerupsUsed] = useState<{ double: boolean; freeze: boolean; fifty: boolean }>({
    double: false,
    freeze: false,
    fifty: false,
  });
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = DUEL_QUESTIONS[currentQuestionIndex];
  const totalQuestions = DUEL_QUESTIONS.length;

  // LOBBY to COUNTDOWN transition
  const handleStartMatchmaking = () => {
    setPhase("COUNTDOWN");
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setPhase("BATTLE");
        startRound(0);
      }
    }, 1000);
  };

  // Start a new round
  const startRound = (index: number) => {
    setCurrentQuestionIndex(index);
    setTimeLeft(15);
    setSelectedOption(null);
    setRoundLocked(false);
    setEliminatedOptions([]);
    setOpponentStatus("THINKING");

    // Opponent answer simulation (realistic random delay between 4 to 11 seconds)
    const opponentDelay = Math.floor(Math.random() * 6000) + 4000;
    setTimeout(() => {
      // 80% accuracy for challenger
      const isOpponentCorrect = Math.random() < 0.8;
      const q = DUEL_QUESTIONS[index];
      const opponentKey = isOpponentCorrect 
        ? q.correctKey 
        : q.options.find(o => o.key !== q.correctKey)?.key || "A";

      const speedFactor = Math.max(200, 1000 - Math.floor(opponentDelay / 10));
      const gained = isOpponentCorrect ? speedFactor : 0;

      setOpponentAnswers(prev => ({
        ...prev,
        [index]: { selected: opponentKey, correct: isOpponentCorrect, score: gained }
      }));

      setOpponentStatus("ANSWERED");
      if (isOpponentCorrect) {
        setOpponentScore(prev => prev + gained);
        setOpponentStreak(prev => prev + 1);
      } else {
        setOpponentStreak(0);
      }
    }, opponentDelay);
  };

  // Round Timer
  useEffect(() => {
    if (phase !== "BATTLE" || roundLocked) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, roundLocked, currentQuestionIndex]);

  const handleTimeExpire = () => {
    if (roundLocked) return;
    submitAnswer(null);
  };

  const handleSelectOption = (key: string) => {
    if (roundLocked || eliminatedOptions.includes(key)) return;
    setSelectedOption(key);
    submitAnswer(key);
  };

  const submitAnswer = (key: string | null) => {
    setRoundLocked(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = key === currentQ.correctKey;
    const baseScore = isCorrect ? Math.round(500 + (timeLeft / 15) * 500) : 0;
    const streakBonus = isCorrect && playerStreak >= 2 ? 1.5 : 1.0;
    const doubleMultiplier = powerupDouble ? 2 : 1;
    const finalScore = Math.round(baseScore * streakBonus * doubleMultiplier);

    setPlayerAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: key || "TIMEOUT",
        correct: isCorrect,
        score: finalScore
      }
    }));

    if (isCorrect) {
      setPlayerScore(prev => prev + finalScore);
      setPlayerStreak(prev => prev + 1);
    } else {
      setPlayerStreak(0);
    }

    setPowerupDouble(false);

    // Wait 2.5 seconds to show visual feedback and move to next question or result
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        startRound(currentQuestionIndex + 1);
      } else {
        setPhase("RESULT");
      }
    }, 2500);
  };

  // Power-up Triggers
  const triggerFiftyFifty = () => {
    if (powerupsUsed.fifty || roundLocked) return;
    const incorrectKeys = currentQ.options
      .filter(o => o.key !== currentQ.correctKey)
      .map(o => o.key);
    // Shuffle and pick 2
    const toEliminate = incorrectKeys.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
    setPowerupsUsed(prev => ({ ...prev, fifty: true }));
  };

  const triggerDoubleScore = () => {
    if (powerupsUsed.double || roundLocked) return;
    setPowerupDouble(true);
    setPowerupsUsed(prev => ({ ...prev, double: true }));
  };

  const triggerTimeFreeze = () => {
    if (powerupsUsed.freeze || roundLocked) return;
    setPowerupFreeze(true);
    setTimeLeft(prev => prev + 5);
    setPowerupsUsed(prev => ({ ...prev, freeze: true }));
  };

  const isUserWinner = playerScore >= opponentScore;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between p-3 sm:p-6">
      {/* 1. LOBBY PHASE */}
      {phase === "LOBBY" && (
        <div className="max-w-2xl w-full mx-auto my-auto text-center space-y-8 py-10">
          <div className="flex items-center justify-between">
            <Link 
              href={`/join/${code}`} 
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sınav Odasına Dön</span>
            </Link>
            <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Oda Kodu: {code}
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500 flex items-center justify-center shadow-xs animate-pulse">
              <Swords className="w-10 h-10 text-slate-950" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              1v1 Canlı İngilizce Düellosu
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              5 Hızlı Soru • Anlık Puan Yarışı • Hız & Doğruluk Çarpanları
            </p>
          </div>

          {/* Player Match Card Preview */}
          <div className="grid grid-cols-11 items-center bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            {/* Player 1 (You) */}
            <div className="col-span-5 text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-xl font-black text-emerald-700 shadow-xs">
                SEN
              </div>
              <div className="font-extrabold text-sm text-slate-900">Öğrenci (Sen)</div>
              <div className="text-[11px] text-emerald-700 font-bold">12-DİL Hazırlık</div>
            </div>

            {/* VS Icon */}
            <div className="col-span-1 text-center font-black text-2xl text-amber-500 italic">
              VS
            </div>

            {/* Player 2 (Challenger) */}
            <div className="col-span-5 text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 border-2 border-rose-500 flex items-center justify-center text-xl font-black text-rose-700 shadow-xs">
                DK
              </div>
              <div className="font-extrabold text-sm text-slate-900">Deniz K.</div>
              <div className="text-[11px] text-rose-700 font-bold">YDS Şampiyonlar</div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleStartMatchmaking}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base tracking-wide shadow-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Swords className="w-5 h-5 text-slate-950" />
              <span>Düelloyu Başlat (Hemen Eşleş)</span>
            </button>

            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(`${window.location.origin}/duel/${code}`);
                  setIsLinkCopied(true);
                  setTimeout(() => setIsLinkCopied(false), 2500);
                }
              }}
              className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-500" />
              <span>{isLinkCopied ? "Bağlantı Panoya Kopyalandı!" : "Arkadaşını Odaya Çağır (Link Kopyala)"}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. COUNTDOWN PHASE */}
      {phase === "COUNTDOWN" && (
        <div className="max-w-md w-full mx-auto my-auto text-center space-y-6 py-20">
          <div className="text-base font-bold text-amber-600 uppercase tracking-widest animate-pulse">
            Eşleşme Tamamlandı!
          </div>
          <div className="text-8xl sm:text-9xl font-black text-slate-900 tracking-tighter animate-bounce">
            {countdown}
          </div>
          <div className="text-sm font-semibold text-slate-500">
            Kemerleri bağlayın, ilk soru geliyor...
          </div>
        </div>
      )}

      {/* 3. BATTLE PHASE */}
      {phase === "BATTLE" && (
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-between py-2 space-y-4">
          {/* Top Real-time Battle HUD */}
          <div className="grid grid-cols-12 items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            {/* Player 1 HUD */}
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center font-black text-emerald-700 text-sm shrink-0">
                SEN
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 truncate">Öğrenci</span>
                  {playerStreak >= 2 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-amber-800 px-1.5 py-0.2 rounded-full bg-amber-50 border border-amber-200">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      x{playerStreak >= 3 ? "2.0" : "1.5"}
                    </span>
                  )}
                </div>
                <div className="text-lg font-black text-emerald-700 tracking-tight">
                  {playerScore.toLocaleString()} P
                </div>
              </div>
            </div>

            {/* Center: Timer & Round */}
            <div className="col-span-2 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>
              <div className={`text-2xl font-black tracking-tight ${timeLeft <= 5 ? "text-rose-600 animate-ping" : "text-slate-900"}`}>
                {timeLeft}s
              </div>
            </div>

            {/* Player 2 HUD */}
            <div className="col-span-5 flex items-center justify-end gap-3 text-right">
              <div className="overflow-hidden">
                <div className="flex items-center justify-end gap-2">
                  {opponentStreak >= 2 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-amber-800 px-1.5 py-0.2 rounded-full bg-amber-50 border border-amber-200">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      x{opponentStreak >= 3 ? "2.0" : "1.5"}
                    </span>
                  )}
                  <span className="text-xs font-extrabold text-slate-900 truncate">Deniz K.</span>
                </div>
                <div className="text-lg font-black text-rose-700 tracking-tight">
                  {opponentScore.toLocaleString()} P
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 border-2 border-rose-500 flex items-center justify-center font-black text-rose-700 text-sm shrink-0">
                DK
              </div>
            </div>
          </div>

          {/* Opponent Status Indicator Pill */}
          <div className="flex items-center justify-center gap-2">
            <div className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-xs ${
              opponentStatus === "THINKING"
                ? "bg-white border-slate-200 text-slate-500"
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>
              <Users className="w-3.5 h-3.5" />
              <span>{opponentStatus === "THINKING" ? "Deniz düşünüyor..." : "⚡ Deniz cevabını verdi!"}</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 my-auto">
            {/* Topic & CEFR Tag */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                {currentQ.subTopic}
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                CEFR {currentQ.cefrLevel}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </div>

            {/* Power-up Inventory Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 mr-2">Güçlendiriciler:</span>
              <button
                disabled={powerupsUsed.fifty || roundLocked}
                onClick={triggerFiftyFifty}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  powerupsUsed.fifty
                    ? "opacity-30 bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                }`}
              >
                <span>50:50</span>
              </button>

              <button
                disabled={powerupsUsed.double || roundLocked}
                onClick={triggerDoubleScore}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  powerupsUsed.double
                    ? "opacity-30 bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : powerupDouble
                    ? "bg-amber-500 text-slate-950 font-black animate-pulse"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>2X Puan</span>
              </button>

              <button
                disabled={powerupsUsed.freeze || roundLocked}
                onClick={triggerTimeFreeze}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  powerupsUsed.freeze
                    ? "opacity-30 bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>+5 Sn</span>
              </button>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt) => {
                const isEliminated = eliminatedOptions.includes(opt.key);
                const isSelected = selectedOption === opt.key;
                const isCorrect = opt.key === currentQ.correctKey;

                let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs cursor-pointer";

                if (roundLocked) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
                  } else {
                    btnStyle = "opacity-40 bg-slate-50 border-slate-200 text-slate-400";
                  }
                } else if (isEliminated) {
                  btnStyle = "opacity-20 line-through cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400";
                }

                return (
                  <button
                    key={opt.key}
                    disabled={roundLocked || isEliminated}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700">
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium pt-0.5 leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after round is locked */}
            {roundLocked && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 animate-in fade-in">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Çözüm & Kural Açıklaması:</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. RESULT / PODIUM PHASE */}
      {phase === "RESULT" && (
        <div className="max-w-2xl w-full mx-auto my-auto text-center space-y-8 py-8">
          {/* Winner Banner */}
          <div className="space-y-3">
            <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center shadow-xs ${
              isUserWinner 
                ? "bg-amber-500 text-slate-950" 
                : "bg-slate-200 text-slate-700"
            }`}>
              <Trophy className="w-12 h-12" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isUserWinner ? "Tebrikler! Zafer Senin!" : "İyi Mücadele! Deniz Kazandı"}
            </h1>
            <p className="text-sm text-slate-500">
              {isUserWinner 
                ? "Rakibinden daha hızlı ve isabetli cevaplar vererek düelloyu kazandın."
                : "Bir sonraki karşılaşmada rövanşı alabilirsin!"}
            </p>
          </div>

          {/* Final Scoreboard Comparison */}
          <div className="grid grid-cols-2 gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            {/* Player 1 Card */}
            <div className={`p-4 rounded-2xl border ${isUserWinner ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"}`}>
              <div className="text-xs font-bold text-slate-500">SEN</div>
              <div className="text-3xl font-black text-emerald-700 my-1">{playerScore.toLocaleString()} P</div>
              <div className="text-[11px] text-slate-600">
                {Object.values(playerAnswers).filter(a => a.correct).length} / {totalQuestions} Doğru
              </div>
            </div>

            {/* Player 2 Card */}
            <div className={`p-4 rounded-2xl border ${!isUserWinner ? "bg-rose-50 border-rose-300" : "bg-slate-50 border-slate-200"}`}>
              <div className="text-xs font-bold text-slate-500">DENİZ K.</div>
              <div className="text-3xl font-black text-rose-700 my-1">{opponentScore.toLocaleString()} P</div>
              <div className="text-[11px] text-slate-600">
                {Object.values(opponentAnswers).filter(a => a.correct).length} / {totalQuestions} Doğru
              </div>
            </div>
          </div>

          {/* Rewards & XP Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-around text-center shadow-xs">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Kazanılan XP</div>
              <div className="text-lg font-black text-slate-900">+{isUserWinner ? "150" : "50"} XP</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Ödül Jetonu</div>
              <div className="text-lg font-black text-amber-600">+{isUserWinner ? "50" : "15"} Jeton</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Mastery Artışı</div>
              <div className="text-lg font-black text-emerald-600">+{isUserWinner ? "%4.2" : "%1.5"}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setPlayerScore(0);
                setPlayerStreak(0);
                setOpponentScore(0);
                setOpponentStreak(0);
                setPlayerAnswers({});
                setOpponentAnswers({});
                setPowerupsUsed({ double: false, freeze: false, fifty: false });
                handleStartMatchmaking();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-950" />
              <span>Rövanş İste (Tekrar Oyna)</span>
            </button>

            <Link
              href={`/join/${code}`}
              className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Oda Lobisine Dön</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
