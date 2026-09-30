"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  RotateCw, 
  Volume2, 
  Check, 
  X, 
  Sparkles, 
  BookOpen, 
  Award,
  Flame,
  Layers,
  ChevronRight
} from "lucide-react";

interface FlashcardItem {
  id: string;
  front: string;
  frontSub: string;
  backMeaning: string;
  backExample: string;
  backGrammarTip: string;
  cefrLevel: string;
  subTopic: string;
}

export default function FlashcardsPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "mock-1";

  const cards: FlashcardItem[] = [
    {
      id: "fc-1",
      front: "figure out",
      frontSub: "Phrasal Verb • /fɪɡ.ər aʊt/",
      backMeaning: "Anlamak, çözmek, bir problemin nedenini bulmak",
      backExample: "Scientists are trying to figure out what triggers the sudden genetic mutation.",
      backGrammarTip: "Geçişli bir edatlı fiildir. Nesne ortaya gelebilir: 'figure it out'.",
      cefrLevel: "B2",
      subTopic: "Phrasal_Verbs",
    },
    {
      id: "fc-2",
      front: "Hardly ... when",
      frontSub: "Grammar Pattern • Inversion",
      backMeaning: "... yapar yapmaz, tam ... olmuştu ki",
      backExample: "Hardly had the meeting started when the fire alarm began ringing.",
      backGrammarTip: "Cümle başında devrik yapı gerektirir: 'Hardly + had + Özne + V3 ... when + Past Simple'.",
      cefrLevel: "C1",
      subTopic: "Inversion",
    },
    {
      id: "fc-3",
      front: "mitigate",
      frontSub: "Academic Verb • /mɪt.ɪ.ɡeɪt/",
      backMeaning: "Hafifletmek, etkisini azaltmak, yatıştırmak",
      backExample: "Immediate conservation efforts could mitigate the severe impacts of the climate crisis.",
      backGrammarTip: "Eş anlamlıları: 'alleviate', 'ease', 'lessen'. Zıt anlamlısı: 'exacerbate' (kötüleştirmek).",
      cefrLevel: "C1",
      subTopic: "Academic_Vocabulary",
    },
    {
      id: "fc-4",
      front: "Unless",
      frontSub: "Conjunction • If not",
      backMeaning: "-medikçe, -mezse (olumsuz koşul)",
      backExample: "Unless prompt conservation strategies are implemented, species will face extinction.",
      backGrammarTip: "Kendi yan cümlesine olumsuzluk eki (not) almaz; anlamca olumsuzdur. Gelecek zaman (will) almaz.",
      cefrLevel: "B2",
      subTopic: "Conditionals",
    },
    {
      id: "fc-5",
      front: "shed light on",
      frontSub: "Idiomatic Collocation",
      backMeaning: "Bir konuya ışık tutmak, aydınlatmak, anlaşılır kılmak",
      backExample: "The newly discovered manuscript sheds invaluable light on ancient Mediterranean trade.",
      backGrammarTip: "Sabit bir edat eşdizimidir: 'shed light ON something'.",
      cefrLevel: "B2",
      subTopic: "Collocations",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCard = cards[currentIndex];

  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMastered = () => {
    setMasteredIds((prev) => [...prev, currentCard.id]);
    nextCard();
  };

  const handleNeedsReview = () => {
    setReviewIds((prev) => [...prev, currentCard.id]);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setReviewIds([]);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#0e0714] bg-gradient-to-b from-[#180a22] via-[#0f0516] to-[#07020a] text-slate-100 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-between z-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Kart {currentIndex + 1} / {cards.length}
          </span>
          <div className="w-32 h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${((currentIndex + (isCompleted ? 1 : 0)) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Flashcard Arena */}
      <main className="max-w-xl w-full mx-auto my-auto py-8 z-10">
        {!isCompleted ? (
          <div className="space-y-6">
            {/* The 3D Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[360px] sm:min-h-[400px] w-full rounded-3xl bg-[#1a0e24] border-2 border-purple-500/30 hover:border-purple-500/60 p-8 flex flex-col justify-between cursor-pointer select-none shadow-2xl shadow-purple-950/40 transition-all hover:scale-[1.01] group relative"
            >
              {/* Top Row: CEFR & Audio */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {currentCard.cefrLevel} • {currentCard.subTopic.replace("_", " ")}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentCard.front);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-purple-900/40 text-purple-400 hover:text-purple-200 transition-colors border border-purple-500/20"
                  title="Sesli Dinle"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Card Center: Front vs Back */}
              <div className="my-auto text-center py-6">
                {!isFlipped ? (
                  /* FRONT: Word / Pattern */
                  <div className="space-y-3 animate-in fade-in zoom-in-95">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {currentCard.front}
                    </h2>
                    <p className="text-xs text-purple-300/80 font-mono tracking-wide">
                      {currentCard.frontSub}
                    </p>
                    <div className="pt-6 text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5 text-purple-400" />
                      <span>Anlamını ve gramer tüyosunu görmek için tıkla</span>
                    </div>
                  </div>
                ) : (
                  /* BACK: Meaning, Example & Grammar Tip */
                  <div className="space-y-4 text-left animate-in fade-in zoom-in-95">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        Türkçe Karşılığı
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                        {currentCard.backMeaning}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-950 text-xs text-slate-300 leading-relaxed italic">
                      "{currentCard.backExample}"
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-200">
                      💡 <strong>Sınav Tüyosu:</strong> {currentCard.backGrammarTip}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                1morequestion Hafıza Kartı • {isFlipped ? "Arka Yüz (Çözüm)" : "Ön Yüz (Soru)"}
              </div>
            </div>

            {/* Answer Control Buttons (Bilmiyorum / Biliyorum) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleNeedsReview}
                className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-rose-500/30 text-rose-300 font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <X className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>Tekrar Etmeliyim</span>
              </button>

              <button
                onClick={handleMastered}
                className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs tracking-wide transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 group"
              >
                <Check className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Biliyorum (Pekiştirildi)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="bg-[#1a0e24] border border-purple-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center mx-auto text-white shadow-xl shadow-purple-950">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">Kart Destesi Tamamlandı!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Sınavda en çok karıştırılan {cards.length} kritik gramer & kelime kalıbını taradınız.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900 rounded-2xl border border-purple-950">
              <div>
                <div className="text-xs text-slate-500 font-bold">Öğrenilen</div>
                <div className="text-2xl font-black text-emerald-400">{masteredIds.length}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold">Tekrar Listesi</div>
                <div className="text-2xl font-black text-rose-400">{reviewIds.length}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
              >
                Tekrar Başlat
              </button>

              <Link
                href="/join/904182"
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-950 flex items-center gap-1.5"
              >
                <span>Sınav Lobisine Dön</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-600 py-3 z-10">
        Spaced Repetition (Aralıklı Tekrar) Metodu ile İngilizce Sınav Kelime Havuzu
      </footer>
    </div>
  );
}
