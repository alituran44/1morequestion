"use client";

import { useState } from "react";
import { 
  Hash, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  Flame,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface TopicCategory {
  id: string;
  icon: string;
  title: string;
  topicCount: number;
  subTopics: { id: string; name: string; questionCount: number; difficulty: string }[];
}

export function TopicCurriculumSection() {
  const [expandedId, setExpandedId] = useState<string>("cat-1");

  const categories: TopicCategory[] = [
    {
      id: "cat-1",
      icon: "#",
      title: "Gramer & Yapı Bilgisi (YDT & YDS)",
      topicCount: 6,
      subTopics: [
        { id: "st-1", name: "Zamanlar (Tenses) & Modals", questionCount: 240, difficulty: "B1 - B2" },
        { id: "st-2", name: "Koşul Cümleleri (Conditionals & Inversion)", questionCount: 185, difficulty: "B2 - C1" },
        { id: "st-3", name: "Bağlaçlar & Cümle Bağlantıları", questionCount: 310, difficulty: "B2 - C1" },
        { id: "st-4", name: "Etken & Edilgen Çatı (Passive & Causative)", questionCount: 120, difficulty: "B1 - B2" },
      ],
    },
    {
      id: "cat-2",
      icon: "📚",
      title: "Akademik Kelime & Phrasal Verbs",
      topicCount: 8,
      subTopics: [
        { id: "st-5", name: "ÖSYM Sık Çıkan 500 Akademik Fiil", questionCount: 500, difficulty: "B2 - C1" },
        { id: "st-6", name: "Phrasal Verbs Master Seti", questionCount: 320, difficulty: "B2 - C1" },
        { id: "st-7", name: "Prepositions (Edat Kalıpları)", questionCount: 215, difficulty: "B2" },
        { id: "st-8", name: "Eş Anlamlı Kelimeler (Synonyms & Antonyms)", questionCount: 410, difficulty: "C1" },
      ],
    },
    {
      id: "cat-3",
      icon: "📖",
      title: "Okuma Anlama & Paragraf Çözümleme",
      topicCount: 5,
      subTopics: [
        { id: "st-9", name: "Ana Fikir & Başlık Bulma", questionCount: 190, difficulty: "B2" },
        { id: "st-10", name: "Çıkarım Yapma (Inference & Author's Tone)", questionCount: 260, difficulty: "C1" },
        { id: "st-11", name: "Paragraf Akışını Bozan Cümle", questionCount: 175, difficulty: "B2 - C1" },
        { id: "st-12", name: "IELTS True / False / Not Given Taktikleri", questionCount: 140, difficulty: "B2 - C1" },
      ],
    },
    {
      id: "cat-4",
      icon: "🎙️",
      title: "Uluslararası Sınav Becerileri (IELTS / TOEFL)",
      topicCount: 6,
      subTopics: [
        { id: "st-13", name: "IELTS Task 1 Grafik Yorumlama Kalıpları", questionCount: 85, difficulty: "B2 - C1" },
        { id: "st-14", name: "TOEFL Dinleme & Özet Çıkarma Notları", questionCount: 110, difficulty: "B2 - C1" },
        { id: "st-15", name: "Duolingo DET C-Test Boşluk Doldurma", questionCount: 350, difficulty: "B1 - C1" },
      ],
    },
  ];

  return (
    <section className="space-y-4 pt-6 border-t border-slate-800/80">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-100">
            Sınav Müfredatı & Konular
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ÖSYM ve Uluslararası sınav kazanım haritası (Wayground modüler konu ağacı)
          </p>
        </div>
        <Link
          href="/pool-search"
          className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
        >
          <span>Hepsini Gör</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const isExpanded = expandedId === cat.id;

          return (
            <div
              key={cat.id}
              className="bg-[#111827] border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all shadow-md group"
            >
              {/* Category Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? "" : cat.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none bg-slate-900/60 hover:bg-slate-850/80 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-base text-sky-400">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-100 text-sm group-hover:text-sky-300 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {cat.topicCount} Temel Alt Konu
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isExpanded ? "rotate-90 text-sky-400" : ""
                  }`}
                />
              </div>

              {/* Sub-topics List */}
              {isExpanded && (
                <div className="p-4 pt-2 divide-y divide-slate-800/80 bg-slate-950/40">
                  {cat.subTopics.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-900/40 px-2 rounded-lg transition-colors group/item"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-mono">
                          Topic {idx + 1}:
                        </span>
                        <span className="font-medium text-slate-200 group-hover/item:text-sky-300">
                          {sub.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {sub.difficulty}
                        </span>
                        <Link
                          href={`/exam/practice?topic=${sub.id}`}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-sky-600/10 text-sky-400 hover:bg-sky-600 hover:text-white font-bold transition-all border border-sky-500/20"
                        >
                          1 Soru Çöz
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
