"use client";

import { useState, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Plus, 
  Trash2, 
  Check, 
  Save, 
  CheckCircle2, 
  Eye, 
  HelpCircle,
  Tag,
  ArrowRight,
  Layers,
  KeyRound,
  ExternalLink,
  BookOpen,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

interface StudioQuestion {
  id: string;
  questionNumber: number;
  content: string;
  passage?: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  cefrLevel: string;
  skillDomain: string;
  subTopic: string;
  difficulty?: number;
}

export default function StudioPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [examTitle, setExamTitle] = useState("2026 YDT Şampiyonlar Özgün Deneme #2");
  const [examCode, setExamCode] = useState("YDT");
  const [examPrice, setExamPrice] = useState(79.0);
  const [durationMins, setDurationMins] = useState(120);

  const [isParsing, setIsParsing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{ mockId: string; pinCode: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>("2026_YDT_Ozgün_Kitapcik.pdf");

  // Extracted questions state
  const [questions, setQuestions] = useState<StudioQuestion[]>([
    {
      id: "q-1",
      questionNumber: 1,
      content: "The research team ______ extensive clinical trials before announcing the revolutionary cancer therapy last year.",
      options: [
        { key: "A", text: "had conducted" },
        { key: "B", text: "has conducted" },
        { key: "C", text: "conducts" },
        { key: "D", text: "is conducting" },
        { key: "E", text: "will have conducted" },
      ],
      correctKey: "A",
      explanation: "Geçmişte gerçekleşmiş başka bir olaydan ('announcing last year') önce tamamlanmış bir eylemi anlattığı için Past Perfect Tense (had conducted) kullanılmalıdır.",
      cefrLevel: "B2",
      skillDomain: "Grammar",
      subTopic: "Tenses & Modals",
    },
    {
      id: "q-2",
      questionNumber: 2,
      content: "Severe droughts across the hemisphere have significantly ______ agricultural outputs, driving global food prices higher.",
      options: [
        { key: "A", text: "diminished" },
        { key: "B", text: "accelerated" },
        { key: "C", text: "encouraged" },
        { key: "D", text: "allocated" },
        { key: "E", text: "stabilized" },
      ],
      correctKey: "A",
      explanation: "'Diminish' (azaltmak, düşürmek) fiili, kuraklığın tarımsal verimi düşürmesi bağlamına tam uymaktadır.",
      cefrLevel: "C1",
      skillDomain: "Vocabulary",
      subTopic: "Academic Verbs",
    },
  ]);

  // Handle actual file upload & parse
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("examCode", examCode);

      const res = await fetch("/api/studio/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleUpdateOption = (qId: string, optKey: string, newText: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((opt) => (opt.key === optKey ? { ...opt, text: newText } : opt)),
            }
          : q
      )
    );
  };

  const handleUpdateCorrectKey = (qId: string, newKey: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, correctKey: newKey } : q))
    );
  };

  // Handle actual database publishing
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch("/api/studio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: examTitle,
          examCode,
          price: examPrice,
          durationMins,
          questions,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPublishResult({
          mockId: data.mockId,
          pinCode: data.pinCode,
        });
      }
    } catch (err) {
      console.error("Publish error:", err);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Publish Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">AI Deneme Stüdyosu</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                OCR & Ayrıştırıcı Aktif
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              PDF'ten çıkarılan soruları düzenleyin, CEFR kazanımlarını etiketleyin ve tek tıkla satışa açın
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublish}
              disabled={isPublishing || isParsing}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isPublishing ? "Veritabanına İşleniyor..." : "Yayınla & PIN Üret"}</span>
            </button>
          </div>
        </div>

        {/* Success Modal / Banner with 6-Digit PIN Code */}
        {publishResult && (
          <div className="p-6 rounded-3xl bg-white border-2 border-emerald-400 text-slate-900 shadow-xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Deneme Sınavı Başarıyla Yayınlandı!</h3>
                  <p className="text-xs text-slate-600">
                    Sınav mağazaya <strong>{examPrice} ₺</strong> ile eklendi, sorular adaptif havuza dağıtıldı.
                  </p>
                </div>
              </div>

              {/* 6-Digit Quizizz PIN Code Badge */}
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Öğrenci Katılım PIN Kodu</div>
                <div className="text-2xl font-black font-mono text-fuchsia-700 tracking-widest bg-fuchsia-50 px-3 py-1 rounded-xl border border-fuchsia-200">
                  {publishResult.pinCode}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
              <Link
                href={`/join/${publishResult.pinCode}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sınav Lobisini Aç (PIN: {publishResult.pinCode})</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                <span>Mağaza Vitrininde Gör</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/library"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                <span>Kütüphaneme Git</span>
              </Link>
            </div>
          </div>
        )}

        {/* Exam Metadata Configuration Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Deneme Başlığı
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sınav Türü
            </label>
            <select
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            >
              <option value="YDT">YDT (YKS-Dil)</option>
              <option value="YDS">YDS (Yabancı Dil Sınavı)</option>
              <option value="YOKDIL">YÖKDİL</option>
              <option value="IELTS_ACAD">IELTS Academic</option>
              <option value="TOEFL_IBT">TOEFL iBT</option>
              <option value="DET">Duolingo English Test</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Satış Ücreti (TL)
            </label>
            <input
              type="number"
              value={examPrice}
              onChange={(e) => setExamPrice(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Süre (Dakika)
            </label>
            <input
              type="number"
              value={durationMins}
              onChange={(e) => setDurationMins(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Split View: Left (Original PDF Upload / Source) & Right (Interactive Extracted Questions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Uploaded PDF Preview Area */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-fit">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-700">Kaynak PDF Dosyası</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono">
                  {isParsing ? "Taranıyor..." : "Hazır"}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2 mb-4">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-800">
                  {uploadedFileName || "Dosya Seçilmedi"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {questions.length} Soru Tespit Edildi & Doğrulandı
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                ℹ️ <strong>AI Ayrıştırma Durumu:</strong> Sorular otomatik olarak numaralandırıldı, A-B-C-D-E şıkları ve cevap anahtarı Zod şeması ile doğrulandı.
              </div>
            </div>

            {/* Hidden real file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing}
              className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                  <span>PDF Taranıyor & Sorular Çıkarılıyor...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-emerald-600" />
                  <span>Cihazdan Yeni PDF / Test Yükle</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Editable Questions List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ayrıştırılan Sorular ({questions.length})
              </span>
              <button
                onClick={() => {
                  const newQ: StudioQuestion = {
                    id: `q-${Date.now()}`,
                    questionNumber: questions.length + 1,
                    content: "Yeni soru metnini buraya yazın...",
                    options: [
                      { key: "A", text: "Seçenek 1" },
                      { key: "B", text: "Seçenek 2" },
                      { key: "C", text: "Seçenek 3" },
                      { key: "D", text: "Seçenek 4" },
                      { key: "E", text: "Seçenek 5" },
                    ],
                    correctKey: "A",
                    explanation: "Detaylı çözüm açıklaması...",
                    cefrLevel: "B2",
                    skillDomain: "Grammar",
                    subTopic: "Tenses & Modals",
                  };
                  setQuestions([...questions, newQ]);
                }}
                className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Manuel Soru Ekle</span>
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4"
              >
                {/* Question Header & Tags */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      #{qIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{q.skillDomain}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{q.subTopic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {q.cefrLevel}
                    </span>
                    <button
                      onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Soru Kökü Textarea */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Soru Metni</label>
                  <textarea
                    rows={2}
                    value={q.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions(questions.map((item) => (item.id === q.id ? { ...item, content: val } : item)));
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white leading-relaxed font-medium"
                  />
                </div>

                {/* Options Inputs with Correct Key Selector */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Seçenekler (Doğru cevabı seçmek için harfe tıklayın)
                  </label>
                  {q.options.map((opt) => (
                    <div key={opt.key} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateCorrectKey(q.id, opt.key)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                          q.correctKey === opt.key
                            ? "bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {opt.key}
                      </button>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleUpdateOption(q.id, opt.key, e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Pedagogical Explanation */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Çözüm & Pedagojik Açıklama
                  </label>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions(questions.map((item) => (item.id === q.id ? { ...item, explanation: val } : item)));
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
