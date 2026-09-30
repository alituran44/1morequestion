export type SkillDomain = 
  | "READING" 
  | "WRITING" 
  | "SPEAKING" 
  | "LISTENING" 
  | "GRAMMAR_VOCAB" 
  | "TRANSLATION";

export interface SkillCategory {
  id: string;
  name: string;
  domain: SkillDomain;
  questionCount: number;
  difficulty: string;
  description: string;
  isAudioRequired?: boolean;
  isWritingRequired?: boolean;
}

export interface ExamSystemConfig {
  code: string;
  name: string;
  shortTitle: string;
  category: "NATIONAL" | "INTERNATIONAL";
  scoringType: "RAW_NET" | "SCORE_100" | "BAND_9" | "SCORE_120" | "PTE_90" | "DET_160";
  scoringLabel: string;
  description: string;
  badgeColor: string;
  durationMins: number;
  totalQuestions: number;
  supportedSkills: SkillDomain[];
  skillDistribution: {
    domain: SkillDomain;
    label: string;
    icon: string;
    percentage: number;
  }[];
  categories: SkillCategory[];
}

export const EXAM_SYSTEMS: Record<string, ExamSystemConfig> = {
  YDT: {
    code: "YDT",
    name: "YKS-Dil (YDT) İngilizce",
    shortTitle: "YDT (YKS-Dil)",
    category: "NATIONAL",
    scoringType: "RAW_NET",
    scoringLabel: "Ham Net (4 Yanlış 1 Doğru)",
    description: "ÖSYM Yükseköğretim Kurumları Sınavı Yabancı Dil Oturumu. 80 çoktan seçmeli soru.",
    badgeColor: "#f59e0b",
    durationMins: 120,
    totalQuestions: 80,
    supportedSkills: ["READING", "GRAMMAR_VOCAB", "TRANSLATION"],
    skillDistribution: [
      { domain: "GRAMMAR_VOCAB", label: "Gramer & Kelime Bilgisi", icon: "🔤", percentage: 35 },
      { domain: "READING", label: "Okuma Anlama & Paragraf", icon: "📖", percentage: 45 },
      { domain: "TRANSLATION", label: "İngilizce-Türkçe Çeviri", icon: "🔄", percentage: 20 },
    ],
    categories: [
      { id: "ydt-tenses", name: "Zamanlar (Tenses) & Modals", domain: "GRAMMAR_VOCAB", questionCount: 240, difficulty: "B1 - B2", description: "Zaman uyumları, etken/edilgen yapılar ve modallar" },
      { id: "ydt-conditionals", name: "Koşul Cümleleri (Conditionals & Inversion)", domain: "GRAMMAR_VOCAB", questionCount: 185, difficulty: "B2 - C1", description: "Type 1, 2, 3, Mixed ve devrik koşul yapıları" },
      { id: "ydt-connectors", name: "Bağlaçlar & Cümle Bağlantıları", domain: "GRAMMAR_VOCAB", questionCount: 310, difficulty: "B2 - C1", description: "Zıtlık, sebep-sonuç ve amaç bildiren zarf bağlaçları" },
      { id: "ydt-phrasals", name: "Phrasal Verbs & Edat Eşdizimleri", domain: "GRAMMAR_VOCAB", questionCount: 420, difficulty: "B2 - C1", description: "Sık çıkan edatlı fiiller ve prepositional phrases" },
      { id: "ydt-reading", name: "Paragraf Okuma & Ana Düşünce", domain: "READING", questionCount: 380, difficulty: "B2", description: "Uzun metinler üzerinden ana fikir ve çıkarım soruları" },
      { id: "ydt-dialogue", name: "Diyalog & Duruma Uygun İfade", domain: "READING", questionCount: 160, difficulty: "B1 - B2", description: "Günlük akışta doğru tepkiyi seçme soruları" },
      { id: "ydt-translation", name: "İki Yönlü Cümle Çevirisi", domain: "TRANSLATION", questionCount: 290, difficulty: "B2", description: "Birebir karşılık ve özne-yüklem uyumlu çeviri taktikleri" },
    ],
  },

  YDS: {
    code: "YDS",
    name: "Yabancı Dil Bilgisi Seviye Tespit Sınavı",
    shortTitle: "YDS Master",
    category: "NATIONAL",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden",
    description: "Akademik kariyer, doçentlik ve kamu personeli için ileri düzey ÖSYM İngilizce sınavı.",
    badgeColor: "#0284c7",
    durationMins: 180,
    totalQuestions: 80,
    supportedSkills: ["READING", "GRAMMAR_VOCAB", "TRANSLATION"],
    skillDistribution: [
      { domain: "READING", label: "İleri Düzey Akademik Okuma", icon: "📖", percentage: 50 },
      { domain: "GRAMMAR_VOCAB", label: "C1 Akademik Kelime & Gramer", icon: "🔤", percentage: 35 },
      { domain: "TRANSLATION", label: "Akademik Çeviri", icon: "🔄", percentage: 15 },
    ],
    categories: [
      { id: "yds-academic-vocab", name: "C1 Akademik Fiiller & Sıfatlar", domain: "GRAMMAR_VOCAB", questionCount: 520, difficulty: "C1", description: "ÖSYM YDS arşivinde en çok puan getiren akademik kelimeler" },
      { id: "yds-cloze", name: "Cloze Test Bütünleme", domain: "GRAMMAR_VOCAB", questionCount: 210, difficulty: "B2 - C1", description: "Metin içi boşluk doldurma ve yapısal bağlayıcılar" },
      { id: "yds-inference", name: "Akademik Çıkarım & Yazarın Tutumu", domain: "READING", questionCount: 340, difficulty: "C1", description: "Felsefe, tarih, iktisat ve biyoloji metinlerinde ton analizi" },
      { id: "yds-restatement", name: "Anlamca En Yakın Cümle (Restatement)", domain: "READING", questionCount: 260, difficulty: "C1", description: "Karmaşık cümlelerin eş anlamlı varyasyonlarını bulma" },
      { id: "yds-irrelevant", name: "Paragraf Akışını Bozan Cümle", domain: "READING", questionCount: 190, difficulty: "B2 - C1", description: "Metin bütünlüğünü bozan mantıksal uyumsuzlukları tespit etme" },
    ],
  },

  YOKDIL: {
    code: "YOKDIL",
    name: "YÖKDİL (Fen / Sağlık / Sosyal)",
    shortTitle: "YÖKDİL Alan",
    category: "NATIONAL",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden",
    description: "Yükseköğretim Kurumları Yabancı Dil Sınavı. Fen, Sağlık ve Sosyal Bilimler alanlarına özel terminoloji.",
    badgeColor: "#059669",
    durationMins: 180,
    totalQuestions: 80,
    supportedSkills: ["READING", "GRAMMAR_VOCAB", "TRANSLATION"],
    skillDistribution: [
      { domain: "READING", label: "Alana Özgü Paragraflar", icon: "📖", percentage: 50 },
      { domain: "GRAMMAR_VOCAB", label: "Sağlık/Fen/Sosyal Terminolojisi", icon: "🔤", percentage: 35 },
      { domain: "TRANSLATION", label: "Teknik & Bilimsel Çeviri", icon: "🔄", percentage: 15 },
    ],
    categories: [
      { id: "yokdil-health", name: "Sağlık Bilimleri Terminolojisi", domain: "GRAMMAR_VOCAB", questionCount: 350, difficulty: "B2 - C1", description: "Tıp, farmakoloji ve halk sağlığı metinleri" },
      { id: "yokdil-science", name: "Fen Bilimleri & Mühendislik Metinleri", domain: "READING", questionCount: 320, difficulty: "B2 - C1", description: "Fizik, kimya, iklim ve mühendislik makaleleri" },
      { id: "yokdil-social", name: "Sosyal Bilimler & Kültür Analizi", domain: "READING", questionCount: 300, difficulty: "B2", description: "Sosyoloji, psikoloji, tarih ve ekonomi okumaları" },
    ],
  },

  IELTS: {
    code: "IELTS",
    name: "IELTS Academic & General Training",
    shortTitle: "IELTS Academic",
    category: "INTERNATIONAL",
    scoringType: "BAND_9",
    scoringLabel: "Band 0.0 - 9.0 Skoru",
    description: "Dünya çapında üniversiteler ve göçmenlik için standart 4 beceri (Okuma, Yazma, Konuşma, Dinleme) sınavı.",
    badgeColor: "#e11d48",
    durationMins: 165,
    totalQuestions: 40,
    supportedSkills: ["READING", "LISTENING", "WRITING", "SPEAKING"],
    skillDistribution: [
      { domain: "READING", label: "Reading (3 Uzun Metin)", icon: "📖", percentage: 25 },
      { domain: "LISTENING", label: "Listening (4 Ses Kaydı)", icon: "🎧", percentage: 25 },
      { domain: "WRITING", label: "Writing (Task 1 & Task 2)", icon: "✍️", percentage: 25 },
      { domain: "SPEAKING", label: "Speaking (Ses Kayıtlı 3 Bölüm)", icon: "🎙️", percentage: 25 },
    ],
    categories: [
      { id: "ielts-speaking-part1", name: "Speaking Part 1: Tanıtım & Günlük Sorular", domain: "SPEAKING", questionCount: 120, difficulty: "B1 - B2", description: "İş, aile, hobiler ve günlük rutinler hakkında 30 sn ses kaydı", isAudioRequired: true },
      { id: "ielts-speaking-part2", name: "Speaking Part 2: Cue Card (2 Dk Konuşma)", domain: "SPEAKING", questionCount: 95, difficulty: "B2 - C1", description: "1 dakika hazırlık ve kesintisiz 2 dakika sesli konuşma kaydı", isAudioRequired: true },
      { id: "ielts-speaking-part3", name: "Speaking Part 3: İki Taraflı Soyut Tartışma", domain: "SPEAKING", questionCount: 110, difficulty: "C1", description: "Part 2 konusuna bağlı derin argüman üretimi ve ses kaydı", isAudioRequired: true },
      { id: "ielts-writing-task1", name: "Writing Task 1: Grafik, Tablo & Süreç", domain: "WRITING", questionCount: 80, difficulty: "B2 - C1", description: "Veri görselleştirme ve raporlama (Minimum 150 kelime)", isWritingRequired: true },
      { id: "ielts-writing-task2", name: "Writing Task 2: Argümantatif Akademik Essay", domain: "WRITING", questionCount: 140, difficulty: "C1", description: "Düşünce yazısı, çözüm önerisi ve tartışma (Minimum 250 kelime)", isWritingRequired: true },
      { id: "ielts-reading-tfng", name: "Reading: True / False / Not Given Taktikleri", domain: "READING", questionCount: 180, difficulty: "B2 - C1", description: "Metindeki doğrulanabilir kanıtları ve eksik bilgileri ayırt etme" },
      { id: "ielts-reading-headings", name: "Reading: Başlık & Paragraf Eşleştirme", domain: "READING", questionCount: 150, difficulty: "B2 - C1", description: "Paragraf ana fikri ile uygun başlığı eşleştirme" },
      { id: "ielts-listening-lectures", name: "Listening: Akademik Konuşma & Boşluk Doldurma", domain: "LISTENING", questionCount: 200, difficulty: "B2", description: "Ses dinleyerek harita, not ve tablo doldurma" },
    ],
  },

  TOEFL: {
    code: "TOEFL",
    name: "TOEFL iBT (Internet-based Test)",
    shortTitle: "TOEFL iBT",
    category: "INTERNATIONAL",
    scoringType: "SCORE_120",
    scoringLabel: "0 - 120 Puan Skalası (Bölüm başı 30)",
    description: "Amerikan ve küresel üniversiteler için entegre konuşma, yazma, dinleme ve okuma sınavı.",
    badgeColor: "#8b5cf6",
    durationMins: 116,
    totalQuestions: 56,
    supportedSkills: ["READING", "LISTENING", "SPEAKING", "WRITING"],
    skillDistribution: [
      { domain: "READING", label: "Reading (2 Pasaj)", icon: "📖", percentage: 25 },
      { domain: "LISTENING", label: "Listening (Dersler & Sohbet)", icon: "🎧", percentage: 25 },
      { domain: "SPEAKING", label: "Speaking (4 Mikrofon Kayıt Görevi)", icon: "🎙️", percentage: 25 },
      { domain: "WRITING", label: "Writing (Akademik Tartışma)", icon: "✍️", percentage: 25 },
    ],
    categories: [
      { id: "toefl-speaking-ind", name: "Speaking Task 1: Independent Opinion", domain: "SPEAKING", questionCount: 110, difficulty: "B2 - C1", description: "15 sn hazırlık, 45 sn mikrofona ses kaydıyla fikir savunma", isAudioRequired: true },
      { id: "toefl-speaking-int", name: "Speaking Task 2-4: Integrated (Oku/Dinle/Konuş)", domain: "SPEAKING", questionCount: 130, difficulty: "C1", description: "Metni oku, kaydı dinle, 30 sn düşün ve 60 sn ses kaydet", isAudioRequired: true },
      { id: "toefl-writing-academic", name: "Writing for an Academic Discussion", domain: "WRITING", questionCount: 100, difficulty: "C1", description: "10 dakikada profesörün sorusuna forumda akademik yanıt yaz", isWritingRequired: true },
      { id: "toefl-writing-integrated", name: "Writing Integrated: Okuma & Dinleme Sentezi", domain: "WRITING", questionCount: 75, difficulty: "C1", description: "Zıt argümanları karşılaştırıp 20 dakikada sentez essay oluştur", isWritingRequired: true },
      { id: "toefl-reading-vocab", name: "Reading: Vocabulary in Context", domain: "READING", questionCount: 220, difficulty: "B2 - C1", description: "Akademik metin içinde kelimenin bağlamsal eşanlamlısını bulma" },
      { id: "toefl-listening-lectures", name: "Listening: University Lectures", domain: "LISTENING", questionCount: 180, difficulty: "B2 - C1", description: "Profesör sunumunu dinleyip amaç ve tutumu yakalama" },
    ],
  },

  PTE: {
    code: "PTE",
    name: "PTE Academic & Duolingo English Test (DET)",
    shortTitle: "PTE & DET",
    category: "INTERNATIONAL",
    scoringType: "PTE_90",
    scoringLabel: "10 - 90 / 10 - 160 Skoru",
    description: "Yapay zeka değerlendirmeli entegre sesli okuma, dikte ve hızlı adaptif dil sınavları.",
    badgeColor: "#d97706",
    durationMins: 120,
    totalQuestions: 50,
    supportedSkills: ["SPEAKING", "WRITING", "READING", "LISTENING"],
    skillDistribution: [
      { domain: "SPEAKING", label: "Read Aloud & Repeat Sentence", icon: "🎙️", percentage: 35 },
      { domain: "WRITING", label: "Summarize Text & Essay", icon: "✍️", percentage: 25 },
      { domain: "READING", label: "Fill in Blanks & Re-order", icon: "📖", percentage: 20 },
      { domain: "LISTENING", label: "Write From Dictation", icon: "🎧", percentage: 20 },
    ],
    categories: [
      { id: "pte-read-aloud", name: "PTE Read Aloud: Mikrofona Sesli Okuma", domain: "SPEAKING", questionCount: 250, difficulty: "B2 - C1", description: "35 sn hazırlık, 40 sn net telaffuzla metni ses kaydetme", isAudioRequired: true },
      { id: "pte-repeat-sentence", name: "PTE Repeat Sentence: Dinle ve Tekrar Et", domain: "SPEAKING", questionCount: 300, difficulty: "B2", description: "3 saniye dinle, duyduğun cümleyi aynen mikrofona söyle", isAudioRequired: true },
      { id: "pte-describe-image", name: "PTE Describe Image: Grafiği Sesli Anlat", domain: "SPEAKING", questionCount: 120, difficulty: "C1", description: "25 sn incele, 40 sn ses kaydıyla grafiğin trendlerini özetle", isAudioRequired: true },
      { id: "det-c-test", name: "DET C-Test: Harf Tamamlama Boşlukları", domain: "READING", questionCount: 400, difficulty: "B1 - C1", description: "Kelimelerin eksik harflerini hızlıca tamamlama" },
    ],
  },
};

export const ALL_EXAM_CODES = Object.keys(EXAM_SYSTEMS);

export function getExamConfig(code: string): ExamSystemConfig {
  return EXAM_SYSTEMS[code] || EXAM_SYSTEMS.YDT;
}
