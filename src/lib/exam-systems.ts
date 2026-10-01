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

export interface WeeklyRoadmapPhase {
  phase: string;
  weekRange: string;
  focus: string;
  tasks: string[];
}

export interface UniversityStudyPlan {
  targetUniversity: string;
  examName: string;
  passingScore: string;
  examStructureSummary: string;
  recommendedDurationWeeks: number;
  criticalFocus: string[];
  weeklyRoadmap: WeeklyRoadmapPhase[];
  dailyRoutine: {
    targetQuestions: number;
    listeningMins: number;
    essaysPerWeek: number;
    strategyTip: string;
  };
}

export interface ExamSystemConfig {
  code: string;
  name: string;
  shortTitle: string;
  category: "NATIONAL" | "INTERNATIONAL" | "UNIVERSITY";
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
  studyPlan?: UniversityStudyPlan;
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

  PROFICIENCY: {
    code: "PROFICIENCY",
    name: "Genel Üniversite Hazırlık Muafiyet & Yeterlik (Tüm Üniversiteler)",
    shortTitle: "Genel Üniversite Muafiyet",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden (Geçme: 60-70)",
    description: "Devlet ve vakıf üniversitelerinin İngilizce hazırlık muafiyet ve yeterlik sınavı formatı.",
    badgeColor: "#0d9488",
    durationMins: 150,
    totalQuestions: 65,
    supportedSkills: ["READING", "LISTENING", "WRITING", "SPEAKING", "GRAMMAR_VOCAB"],
    skillDistribution: [
      { domain: "READING", label: "Careful Reading & Pasaj Analizi", icon: "📖", percentage: 30 },
      { domain: "WRITING", label: "Academic Essay (Opinion & Cause-Effect)", icon: "✍️", percentage: 25 },
      { domain: "LISTENING", label: "Note-Taking & While-Listening", icon: "🎧", percentage: 20 },
      { domain: "SPEAKING", label: "Mülakat & Ses Kayıtlı Sunum", icon: "🎙️", percentage: 15 },
      { domain: "GRAMMAR_VOCAB", label: "Use of English & Restatement", icon: "🔤", percentage: 10 },
    ],
    categories: [
      { id: "prof-restatement", name: "Use of English: Restatement (Eş Anlamlı Cümle)", domain: "GRAMMAR_VOCAB", questionCount: 280, difficulty: "B2 - C1", description: "Gramatikal yapıları koruyarak anlamca en yakın cümleyi seçme" },
      { id: "prof-note-taking", name: "Listening: Note-Taking (Dinlerken Not Alma & Boşluk Doldurma)", domain: "LISTENING", questionCount: 160, difficulty: "B2 - C1", description: "Akademik konferansı dinleyip not alarak soruları yanıtlama" },
      { id: "prof-while-listening", name: "Listening: While-Listening (Anlık Çoktan Seçmeli Dinleme)", domain: "LISTENING", questionCount: 190, difficulty: "B2", description: "Konuşma akarken doğrudan soruları eş zamanlı çözme" },
      { id: "prof-careful-reading", name: "Reading: Careful Reading & Contextual Reference", domain: "READING", questionCount: 240, difficulty: "B2 - C1", description: "Detaylı metin inceleme, ana düşünce ve paragraf tamamlama" },
      { id: "prof-academic-essay", name: "Writing: Academic Essay (Opinion / Problem-Solution)", domain: "WRITING", questionCount: 110, difficulty: "B2 - C1", description: "Min. 250 kelimelik argümantatif veya sebep-sonuç akademik deneme", isWritingRequired: true },
      { id: "prof-speaking-response", name: "Speaking: Academic Oral Interview (Ses Kayıtlı)", domain: "SPEAKING", questionCount: 95, difficulty: "B2", description: "Hazırlık süresi sonrasında mikrofonla akıcı fikir savunma kaydı", isAudioRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Devlet & Vakıf Üniversiteleri",
      examName: "Üniversite İngilizce Yeterlik Sınavı",
      passingScore: "60 - 70 / 100 (B2 Seviyesi)",
      examStructureSummary: "Reading pasajları, Use of English gramer yapıları, dinleme not alma ve 250 kelimelik akademik kompozisyon.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["B2 Seviyesi Gramer ve Cümle Tamamlama", "Akademik Paragraf Okuma ve Çıkarım", "Argümantatif Essay Organizasyonu"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Temel Dil & Kelime", tasks: ["B2 seviyesi bağlaçlar, zaman uyumları ve cümle kurma", "Akademik kelime listeleri (AWL) taraması"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Okuma & Dinleme", tasks: ["Paragraf ana fikri çıkarma ve referans soru çözümleri", "Ders dinleme ve ana noktaları not alma alıştırmaları"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Akademik Essay", tasks: ["Opinion ve Cause-Effect essay şablonları", "Yapay zeka ile anında essay puanlaması"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Deneme Simülasyonu", tasks: ["Tam süreli üniversite muafiyet denemeleri", "Zayıf kalan konulara özel 1 Soru Daha antrenmanları"] },
      ],
      dailyRoutine: {
        targetQuestions: 30,
        listeningMins: 15,
        essaysPerWeek: 2,
        strategyTip: "Sınavda en çok puan getiren bölümler Reading ve Essay'dir. Her gün düzenli okuma yaparak kelime bilginizi canlı tutun.",
      },
    },
  },

  BUEPT: {
    code: "BUEPT",
    name: "Boğaziçi Üniversitesi BÜYES / BUEPT Yeterlik Sınavı",
    shortTitle: "Boğaziçi Üniversitesi (BUEPT)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "Harf Notu (A-B-C / Geçme: 60)",
    description: "Boğaziçi Üniversitesi Hazırlık Atlama (BÜYES / BUEPT) Search Reading, Note-Taking ve 2 Essay formatı.",
    badgeColor: "#0284c7",
    durationMins: 210,
    totalQuestions: 40,
    supportedSkills: ["READING", "LISTENING", "WRITING"],
    skillDistribution: [
      { domain: "READING", label: "Search Reading & Reading Comprehension", icon: "📖", percentage: 35 },
      { domain: "WRITING", label: "2 Ayrı Akademik Essay (Task 1 & 2)", icon: "✍️", percentage: 35 },
      { domain: "LISTENING", label: "Note-Taking & While-Listening", icon: "🎧", percentage: 30 },
    ],
    categories: [
      { id: "buept-search-reading", name: "Search Reading: Hızlı Tarama & Hedef Paragraf Eşleştirme", domain: "READING", questionCount: 150, difficulty: "C1", description: "Süre baskısı altında soruya yönelik spesifik paragrafı bulma" },
      { id: "buept-careful-reading", name: "Reading Comprehension: İleri Düzey Akademik Metinler", domain: "READING", questionCount: 180, difficulty: "C1", description: "Boğaziçi formatında derin çıkarım, referans ve ana fikir soruları" },
      { id: "buept-note-taking", name: "Listening: Note-Taking (15 Dk Akademik Ders Dinleme)", domain: "LISTENING", questionCount: 130, difficulty: "C1", description: "Ders kaydını dinlerken boş kağıda not alıp ardından soruları çözme" },
      { id: "buept-while-listening", name: "Listening: While-Listening (Akademik Röportaj & Diyalog)", domain: "LISTENING", questionCount: 140, difficulty: "B2 - C1", description: "Dinleme anında soruları eş zamanlı işaretleme" },
      { id: "buept-essay-1", name: "Writing: Argumentative Essay (Min 300 Kelime)", domain: "WRITING", questionCount: 85, difficulty: "C1", description: "Karşıt görüşleri çürüten yapılandırılmış akademik makale", isWritingRequired: true },
      { id: "buept-essay-2", name: "Writing: Cause-Effect & Problem-Solution Essay", domain: "WRITING", questionCount: 75, difficulty: "C1", description: "Akademik problem analizi ve çözüm önerisi sunumu", isWritingRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Boğaziçi Üniversitesi",
      examName: "BUEPT / BÜYES Hazırlık Atlama Sınavı",
      passingScore: "60 / 100 (C Notu) - Bazı Mühendislik Bölümleri için 70 (B)",
      examStructureSummary: "Search Reading (Süre baskılı hızlı tarama), 15 dk ses kayıtlı Note-Taking dersi ve 2 ayrı TWE Essay.",
      recommendedDurationWeeks: 8,
      criticalFocus: [
        "Search Reading Hızlı Tarama & Anahtar Kelime Yakalama",
        "15 Dk Kesintisiz Akademik Not Alma (Note-Taking)",
        "Argümantatif ve Problem-Çözüm Çift Essay Formatı",
      ],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Search Reading Taktikleri", tasks: ["Metni baştan sona okumadan anahtar kelime eşleştirme tekniği", "Zaman yönetimi (Paragraf başına 90 saniye)"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Note-Taking Dinleme", tasks: ["15 dakikalık ders kayıtlarından kısaltmalarla not çıkarma", "While-listening diyalog sorularında dikkat ve odaklanma"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Boğaziçi TWE 2 Essay", tasks: ["Task 1 Opinion Essay (Karşıt görüşü çürütme kurgusu)", "Task 2 Problem-Solution akademik makale şablonları"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Tam Deneme & Simülasyon", tasks: ["210 dakikalık tam süreli BUEPT denemeleri", "Yapay Zeka Essay analizi ile zayıf argümanları onarma"] },
      ],
      dailyRoutine: {
        targetQuestions: 25,
        listeningMins: 20,
        essaysPerWeek: 2,
        strategyTip: "Search Reading bölümünde metni baştan sona okumak en büyük tuzaktır. Önce soruları okuyup spesifik anahtar kelimeleri tespit edin.",
      },
    },
  },

  ODTU_IYS: {
    code: "ODTU_IYS",
    name: "ODTÜ İngilizce Yeterlik Sınavı (EPE / İYS)",
    shortTitle: "ODTÜ (EPE Yeterlik)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden (Geçme: 60)",
    description: "ODTÜ EPE standartlarında Language Use, Restatement, Note-Taking, Reading ve Expository Essay.",
    badgeColor: "#b91c1c",
    durationMins: 165,
    totalQuestions: 60,
    supportedSkills: ["READING", "LISTENING", "WRITING", "GRAMMAR_VOCAB"],
    skillDistribution: [
      { domain: "READING", label: "Academic Reading Comprehension", icon: "📖", percentage: 30 },
      { domain: "LISTENING", label: "Note-Taking Lecture & Dialogues", icon: "🎧", percentage: 25 },
      { domain: "WRITING", label: "Academic Expository / Opinion Essay", icon: "✍️", percentage: 25 },
      { domain: "GRAMMAR_VOCAB", label: "Language Use, Cloze & Restatement", icon: "🔤", percentage: 20 },
    ],
    categories: [
      { id: "odtu-restatement", name: "Language Use: Restatement (Anlamca En Yakın Cümle)", domain: "GRAMMAR_VOCAB", questionCount: 220, difficulty: "B2 - C1", description: "ODTÜ sınavının ayırt edici karmaşık restatement soruları" },
      { id: "odtu-note-taking", name: "Listening: Note-Taking (Dinlerken Not Alma & Soru Yanıtlama)", domain: "LISTENING", questionCount: 140, difficulty: "B2 - C1", description: "Uzun akademik ders kaydını dinlerken not alıp cevaplama" },
      { id: "odtu-reading", name: "Reading: Makale Okuma & Yazar Amacı Analizi", domain: "READING", questionCount: 210, difficulty: "B2 - C1", description: "Bilimsel ve felsefi metinlerde ana fikir, detay ve çıkarım" },
      { id: "odtu-essay", name: "Writing: Academic Essay (Min 250 Kelime)", domain: "WRITING", questionCount: 90, difficulty: "B2 - C1", description: "Giriş-gelişme-sonuç formatında tutarlı akademik düşünce yazısı", isWritingRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Orta Doğu Teknik Üniversitesi (ODTÜ)",
      examName: "ODTÜ EPE (English Proficiency Exam)",
      passingScore: "60 / 100 (Bazı bölümler için 65 - 70)",
      examStructureSummary: "Language Use (Restatement / Paraphrasing), Academic Reading, Note-Taking dinleme ve Expository Essay.",
      recommendedDurationWeeks: 8,
      criticalFocus: [
        "Restatement (Eş Anlamlı Cümle) Mantığı & Bağlaçlar",
        "Akademik Makale Derin Çıkarım & Yazar Amacı",
        "Giriş-Gelişme-Sonuç Formatında Expository Essay",
      ],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Restatement & Dil Kullanımı", tasks: ["ODTÜ'ye özgü karmaşık restatement yapılarını çözme", "Zıtlık ve neden-sonuç bağlaçlarının varyasyonları"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Akademik Okuma", tasks: ["Bilimsel ve felsefi makalelerde yazarın ana fikrini bulma", "Kelime tahmini ve bağlamsal çıkarım alıştırmaları"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Note-Taking & Essay", tasks: ["Konferans derslerinden not çıkarıp soruları yanıtlama", "Giriş-gelişme-sonuç formatında 250+ kelimelik Expository Essay"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "EPE Deneme Kampı", tasks: ["165 dakikalık tam EPE denemeleri", "Soru çözüm hızını 60 soru için optimize etme"] },
      ],
      dailyRoutine: {
        targetQuestions: 30,
        listeningMins: 15,
        essaysPerWeek: 2,
        strategyTip: "ODTÜ EPE'de Restatement sorularını doğru yapmak sınavı geçmenin kilit anahtarıdır. Cümledeki zaman (tense) ve kesinlik (modals) dengesine dikkat edin.",
      },
    },
  },

  ITU_IYS: {
    code: "ITU_IYS",
    name: "İTÜ İngilizce Yeterlik Sınavı (İYS)",
    shortTitle: "İTÜ (İYS Yeterlik)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden (Geçme: 60)",
    description: "İTÜ İYS standartlarında Use of English, Reading Comprehension, Note-Taking ve Akademik Essay.",
    badgeColor: "#1e3a8a",
    durationMins: 150,
    totalQuestions: 50,
    supportedSkills: ["READING", "LISTENING", "WRITING", "GRAMMAR_VOCAB"],
    skillDistribution: [
      { domain: "READING", label: "Reading Comprehension & Analysis", icon: "📖", percentage: 30 },
      { domain: "GRAMMAR_VOCAB", label: "Use of English, Cloze & Cümle Tamamlama", icon: "🔤", percentage: 25 },
      { domain: "WRITING", label: "Academic Essay (Min 250 Kelime)", icon: "✍️", percentage: 25 },
      { domain: "LISTENING", label: "Note-Taking & Lecture Comprehension", icon: "🎧", percentage: 20 },
    ],
    categories: [
      { id: "itu-use-of-english", name: "Use of English: Paragraf ve Cümle Tamamlama", domain: "GRAMMAR_VOCAB", questionCount: 200, difficulty: "B2 - C1", description: "İTÜ sınavına özel dilbilgisi ve bağlam analizi" },
      { id: "itu-reading", name: "Reading: Akademik Metin & Çıkarım Soruları", domain: "READING", questionCount: 190, difficulty: "B2 - C1", description: "Teknik ve sosyal bilim metinlerinde detay ve yazar amacı" },
      { id: "itu-listening", name: "Listening: Note-Taking & While-Listening", domain: "LISTENING", questionCount: 130, difficulty: "B2 - C1", description: "Ders kaydı dinleyerek ana argümanları not alma" },
      { id: "itu-essay", name: "Writing: Opinion / Advantage-Disadvantage Essay", domain: "WRITING", questionCount: 80, difficulty: "B2 - C1", description: "250 kelimelik yapılandırılmış akademik makale", isWritingRequired: true },
    ],
    studyPlan: {
      targetUniversity: "İstanbul Teknik Üniversitesi (İTÜ)",
      examName: "İTÜ İngilizce Yeterlik Sınavı (İYS)",
      passingScore: "60 / 100",
      examStructureSummary: "Use of English dil bilgisi, Reading okuma anlama, Note-Taking dinleme ve Akademik Essay.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["Use of English Gramer ve Cümle Tamamlama", "Reading Soru-Paragraf Eşleştirme Hızı", "250 Kelimelik Akademik Essay Şablonu"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Use of English", tasks: ["Cümle ve paragraf tamamlama soru taktikleri", "İTÜ formatındaki akademik bağlaçlar"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Reading & Dinleme", tasks: ["Hızlı tarama ve detay bulma alıştırmaları", "Note-taking dinleme sırasında anahtar kelimeleri yakalama"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Essay Yazımı", tasks: ["Advantage-Disadvantage ve Opinion essay şablonları", "Geçiş kelimeleri ve argüman destekleme"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Deneme Kampı", tasks: ["150 dakikalık tam İTÜ İYS denemeleri", "Hata analizleri ve son tekrarlar"] },
      ],
      dailyRoutine: {
        targetQuestions: 30,
        listeningMins: 15,
        essaysPerWeek: 2,
        strategyTip: "İTÜ İYS'de Use of English netlerini yüksek tutmak, essay puanı öncesinde güvenli baraja ulaşmanızı sağlar.",
      },
    },
  },

  BILKENT_PAE: {
    code: "BILKENT_PAE",
    name: "Bilkent Üniversitesi PAE İngilizce Yeterlik Sınavı",
    shortTitle: "Bilkent Üniversitesi (PAE)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "Stage 1 %60 Eleme, Stage 2 60-65/100",
    description: "Bilkent 2 Aşamalı PAE: Stage 1 eleme, Stage 2 Note-Taking, Comparison Essay ve Ses Kayıtlı Speaking mülakatı.",
    badgeColor: "#4f46e5",
    durationMins: 180,
    totalQuestions: 55,
    supportedSkills: ["READING", "LISTENING", "WRITING", "SPEAKING", "GRAMMAR_VOCAB"],
    skillDistribution: [
      { domain: "WRITING", label: "Academic Essay Writing", icon: "✍️", percentage: 25 },
      { domain: "SPEAKING", label: "Speaking Interview (Ses Kayıtlı)", icon: "🎙️", percentage: 20 },
      { domain: "READING", label: "Advanced Reading Texts", icon: "📖", percentage: 25 },
      { domain: "LISTENING", label: "Lecture Comprehension", icon: "🎧", percentage: 15 },
      { domain: "GRAMMAR_VOCAB", label: "Use of English & Structure", icon: "🔤", percentage: 15 },
    ],
    categories: [
      { id: "bilkent-speaking", name: "Speaking: Academic Presentation & Debate (Ses Kayıtlı)", domain: "SPEAKING", questionCount: 110, difficulty: "B2 - C1", description: "Mülakat sorularına mikrofonla yapılandırılmış ses kaydı oluşturma", isAudioRequired: true },
      { id: "bilkent-writing", name: "Writing: Comparison & Contrast / Cause-Effect Essay", domain: "WRITING", questionCount: 80, difficulty: "C1", description: "İleri düzey akademik organizasyon ve zengin kelime kullanımı", isWritingRequired: true },
      { id: "bilkent-reading", name: "Reading: Text Synthesizing & Analysis", domain: "READING", questionCount: 175, difficulty: "B2 - C1", description: "Çoklu metin sentezi ve akademik argüman takibi" },
      { id: "bilkent-listening", name: "Listening: Academic Seminar & Note-Taking", domain: "LISTENING", questionCount: 130, difficulty: "B2 - C1", description: "Konferans konuşmalarından not çıkarımı" },
    ],
    studyPlan: {
      targetUniversity: "Bilkent Üniversitesi",
      examName: "Bilkent PAE (Proficiency in Academic English)",
      passingScore: "Stage 1: %60 Eleme Barajı • Stage 2: 60-65 / 100",
      examStructureSummary: "2 Aşamalı Sınav: 1. Aşama dil bilgisi ve okuma elemesi; 2. Aşama dinleme, essay ve ses kayıtlı sözlü mülakat.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["Stage 1 Hızlı Eleme Netlerini Garantiye Alma", "Comparison & Contrast Essay Yapısı", "Ses Kayıtlı Akademik Speaking Mülakatı"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Stage 1 Eleme", tasks: ["Vocabulary ve gramer yapılarını hızlandırarak Stage 1 barajını aşma"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Metin Sentezi & Dinleme", tasks: ["Seminer dinleme ve not alma teknikleri", "Birden fazla akademik kaynaktan bilgi sentezleme"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Writing & Speaking", tasks: ["Comparison & Contrast essay formatı", "Mikrofona ses kaydı ile akıcı fikir savunma"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Tam PAE Simülasyonu", tasks: ["Stage 1 + Stage 2 ardışık simülasyon denemeleri"] },
      ],
      dailyRoutine: {
        targetQuestions: 25,
        listeningMins: 15,
        essaysPerWeek: 2,
        strategyTip: "Stage 1 elemesini geçemeyen öğrenci Stage 2'ye giremez. Bu yüzden ilk 2 haftada dilbilgisi ve kelime netlerinizi %80 üzerine çıkarın.",
      },
    },
  },

  KOC_KUEPE: {
    code: "KOC_KUEPE",
    name: "Koç Üniversitesi İngilizce Yeterlik Sınavı (KUEPE)",
    shortTitle: "Koç Üniversitesi (KUEPE)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Skalası (Geçme: 60)",
    description: "Koç KUEPE: İleri düzey akademik okuma, ders dinleme, 300 kelimelik argümantatif essay ve sözlü mülakat.",
    badgeColor: "#991b1b",
    durationMins: 180,
    totalQuestions: 55,
    supportedSkills: ["READING", "LISTENING", "WRITING", "SPEAKING"],
    skillDistribution: [
      { domain: "READING", label: "Academic Reading & Critical Analysis", icon: "📖", percentage: 30 },
      { domain: "WRITING", label: "Synthesized Argumentative Essay", icon: "✍️", percentage: 30 },
      { domain: "LISTENING", label: "Lecture Comprehension & Note-Taking", icon: "🎧", percentage: 20 },
      { domain: "SPEAKING", label: "Academic Discussion & Interview", icon: "🎙️", percentage: 20 },
    ],
    categories: [
      { id: "koc-reading", name: "Reading: Critical Analysis & Reference", domain: "READING", questionCount: 190, difficulty: "C1", description: "Eleştirel okuma, yazar tutumu ve veri sentezi" },
      { id: "koc-listening", name: "Listening: Lecture Comprehension & Note-Taking", domain: "LISTENING", questionCount: 140, difficulty: "C1", description: "Uzun ders kaydı ve soru-cevap oturumları" },
      { id: "koc-writing", name: "Writing: Synthesized Argumentative Essay", domain: "WRITING", questionCount: 85, difficulty: "C1", description: "300 kelimelik güçlü argümantatif akademik essay", isWritingRequired: true },
      { id: "koc-speaking", name: "Speaking: Academic Discussion & Interview", domain: "SPEAKING", questionCount: 100, difficulty: "B2 - C1", description: "Akademik soruya düşünce savunusu geliştirme", isAudioRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Koç Üniversitesi",
      examName: "Koç KUEPE (Koç University English Proficiency Exam)",
      passingScore: "60 / 100",
      examStructureSummary: "Akademik okuma, ders dinleme ve not alma, 300+ kelimelik sentez essay ve sözlü mülakat.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["Eleştirel Okuma & Argüman Tespiti", "Sentez Essay (Synthesized Writing)", "Akademik Mülakat / Speaking Akıcılığı"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Akademik Okuma & Kelime", tasks: ["C1 seviyesi eleştirel analiz metinleri", "Yazar tutumu ve tonu çıkarma"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Note-Taking & Mülakat", tasks: ["Ders notu çıkarma ve dinleme soruları", "Speaking soru kalıplarına sesli yanıt pratiği"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "KUEPE Essay", tasks: ["Kaynak metne referans vererek essay yazma", "Tez cümlesi ve argüman savunusu"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Tam Simülasyon", tasks: ["Tam KUEPE denemeleri ve zaman yönetimi"] },
      ],
      dailyRoutine: {
        targetQuestions: 25,
        listeningMins: 20,
        essaysPerWeek: 2,
        strategyTip: "Koç KUEPE essay bölümünde sadece fikir belirtmek yetmez; metinden kanıt göstererek argüman inşa etmelisiniz.",
      },
    },
  },

  SABANCI_ELAE: {
    code: "SABANCI_ELAE",
    name: "Sabancı Üniversitesi İngilizce Dil Ölçme Sınavı (ELAE)",
    shortTitle: "Sabancı Üniversitesi (ELAE)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "Geçme Notu: 65 / 100",
    description: "Sabancı ELAE: 2 Aşamalı sınav. Metin analizi, Lecture Note-Taking ve metin sentezi (Synthesized Writing).",
    badgeColor: "#1e40af",
    durationMins: 170,
    totalQuestions: 50,
    supportedSkills: ["READING", "LISTENING", "WRITING"],
    skillDistribution: [
      { domain: "READING", label: "Reading Comprehension & Synthesis", icon: "📖", percentage: 35 },
      { domain: "WRITING", label: "Academic Synthesis Essay", icon: "✍️", percentage: 35 },
      { domain: "LISTENING", label: "Lecture Listening & Note-Taking", icon: "🎧", percentage: 30 },
    ],
    categories: [
      { id: "sabanci-reading", name: "Stage 1: Reading Comprehension & Structure", domain: "READING", questionCount: 210, difficulty: "B2", description: "Hızlı eleme metinleri ve çıkarım soruları" },
      { id: "sabanci-listening", name: "Stage 2: Seminar Listening & Note-Taking", domain: "LISTENING", questionCount: 130, difficulty: "C1", description: "Konferans konuşmasından detaylı not çıkarma" },
      { id: "sabanci-writing", name: "Stage 2: Synthesis Essay Writing", domain: "WRITING", questionCount: 95, difficulty: "C1", description: "Dinleme ve okuma parçalarını birleştiren essay", isWritingRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Sabancı Üniversitesi",
      examName: "Sabancı ELAE (English Language Assessment Exam)",
      passingScore: "65 / 100 (Stage 1 ve Stage 2 Toplamı)",
      examStructureSummary: "2 Aşamalı sınav: Metin analizi, seminer dinleme not alma ve dinleme ile metni birleştiren sentez essay.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["Metin ve Dinlemeyi Birleştiren Sentez Essay", "Seminer Note-Taking", "Hızlı Okuma Elemesi"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Stage 1 Eleme", tasks: ["Hızlı okuma ve temel anlama soruları"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Note-Taking", tasks: ["Seminer konuşmalarını bölümlere ayırarak not alma"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Synthesis Essay", tasks: ["Okuma ve dinlemedeki iki farklı görüşü sentezleme"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "ELAE Deneme Kampı", tasks: ["Tam süreli ELAE sınav simülasyonları"] },
      ],
      dailyRoutine: {
        targetQuestions: 25,
        listeningMins: 20,
        essaysPerWeek: 2,
        strategyTip: "ELAE Synthesis Essay'de sadece kendi fikrinizi değil, metin ve ses kaydındaki bilgileri doğru referansla aktarmalısınız.",
      },
    },
  },

  YTU_IYS: {
    code: "YTU_IYS",
    name: "Yıldız Teknik Üniversitesi İngilizce Yeterlik Sınavı (YTÜ İYS)",
    shortTitle: "Yıldız Teknik (YTÜ İYS)",
    category: "UNIVERSITY",
    scoringType: "SCORE_100",
    scoringLabel: "100 Puan Üzerinden (Geçme: 60)",
    description: "YTÜ İYS: Use of English, Cloze Test, Reading Comprehension, Dinleme ve Essay kompozisyonu.",
    badgeColor: "#0f766e",
    durationMins: 150,
    totalQuestions: 50,
    supportedSkills: ["READING", "LISTENING", "WRITING", "GRAMMAR_VOCAB"],
    skillDistribution: [
      { domain: "READING", label: "Reading Comprehension", icon: "📖", percentage: 30 },
      { domain: "GRAMMAR_VOCAB", label: "Use of English & Cloze Test", icon: "🔤", percentage: 30 },
      { domain: "WRITING", label: "Academic Essay Writing", icon: "✍️", percentage: 20 },
      { domain: "LISTENING", label: "While-Listening Comprehension", icon: "🎧", percentage: 20 },
    ],
    categories: [
      { id: "ytu-grammar", name: "Use of English & Cloze Test", domain: "GRAMMAR_VOCAB", questionCount: 240, difficulty: "B2", description: "YTÜ sınavı gramer yapıları ve boşluk doldurma" },
      { id: "ytu-reading", name: "Reading Comprehension & Analysis", domain: "READING", questionCount: 180, difficulty: "B2", description: "Akademik metin anlama ve ana fikir" },
      { id: "ytu-listening", name: "While-Listening Comprehension", domain: "LISTENING", questionCount: 120, difficulty: "B2", description: "Konuşma akarken soru yanıtlama" },
      { id: "ytu-essay", name: "Academic Essay Writing", domain: "WRITING", questionCount: 70, difficulty: "B2", description: "250 kelimelik akademik kompozisyon", isWritingRequired: true },
    ],
    studyPlan: {
      targetUniversity: "Yıldız Teknik Üniversitesi",
      examName: "YTÜ İYS (İngilizce Yeterlik Sınavı)",
      passingScore: "60 / 100",
      examStructureSummary: "Use of English gramer ve cloze test, reading pasajları, while-listening ve 250 kelimelik essay.",
      recommendedDurationWeeks: 8,
      criticalFocus: ["Gramer & Cloze Test Netleri", "Reading Paragraf Hızı", "Essay Şablonu"],
      weeklyRoadmap: [
        { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Use of English & Cloze", tasks: ["YTÜ soru tipleri ile gramer açıklarını kapatma"] },
        { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Reading & Dinleme", tasks: ["Paragraf soruları ve dinleme teknikleri"] },
        { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Essay Yazımı", tasks: ["Opinion ve Cause-Effect essay yazım şablonları"] },
        { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Deneme Kampı", tasks: ["Tam süreli YTÜ İYS denemeleri"] },
      ],
      dailyRoutine: {
        targetQuestions: 30,
        listeningMins: 15,
        essaysPerWeek: 2,
        strategyTip: "Use of English ve Cloze test sorularını hızlı ve hatasız bitirmek essay için zaman kazandırır.",
      },
    },
  },
};

export const ALL_EXAM_CODES = Object.keys(EXAM_SYSTEMS);

export function getExamConfig(code: string): ExamSystemConfig {
  if (!code) return EXAM_SYSTEMS.BUEPT;
  const upper = code.toUpperCase();
  if (upper === "ODTU" || upper === "ODTU_EPE") return EXAM_SYSTEMS.ODTU_IYS;
  if (upper === "ITU") return EXAM_SYSTEMS.ITU_IYS;
  if (upper === "BILKENT") return EXAM_SYSTEMS.BILKENT_PAE;
  if (upper === "KOC") return EXAM_SYSTEMS.KOC_KUEPE;
  if (upper === "SABANCI") return EXAM_SYSTEMS.SABANCI_ELAE;
  if (upper === "YTU") return EXAM_SYSTEMS.YTU_IYS;
  if (upper === "BOGAZICI") return EXAM_SYSTEMS.BUEPT;
  return EXAM_SYSTEMS[code] || EXAM_SYSTEMS.BUEPT;
}
