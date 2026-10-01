export interface AudioSubmission {
  id: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  examTitle: string;
  examCode: string;
  targetUniversity: string;
  questionNumber: number;
  promptTitle: string;
  durationSec: number;
  audioUrl: string;
  submittedAt: string;
  status: "GRADED" | "NEEDS_REVIEW" | "APPROVED";
  aiScoreBand: number; // e.g. 7.5
  rubric: {
    pronunciation: number;
    fluency: number;
    vocabulary: number;
    grammar: number;
  };
  aiFeedback: string;
  instructorNote?: string;
}

export interface StudentResultItem {
  id: string;
  studentName: string;
  studentEmail: string;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  netScore: number;
  scaledScore: string;
  timeSpentMins: number;
  audioSubmissionId?: string;
  audioDurationSec?: number;
  audioScoreBand?: number;
  essayText?: string;
  essayWordCount?: number;
  essayScoreBand?: number;
  weakTopics: string[];
}

export interface QuestionAnalysisItem {
  questionNumber: number;
  subTopic: string;
  domain: string;
  successPercentage: number;
  mostCommonWrongChoice: string;
  correctAnswer: string;
}

export interface ExamDetailedReport {
  id: string;
  title: string;
  examCode: string;
  hostedDate: string;
  participantsCount: number;
  accessCode: string;
  targetClass: string;
  averageScore: string;
  weakestTopic: string;
  strongestTopic: string;
  status: "COMPLETED" | "RUNNING" | "SCHEDULED";
  audioCount: number;
  essayCount: number;
  studentResults: StudentResultItem[];
  questionAnalysis: QuestionAnalysisItem[];
}

// Sample short audible speech tone data URI so the HTML5 audio element can actually play
export const SAMPLE_AUDIO_URI = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV4GAACBhYqFbF1fdJivrJBhNjVgodDbq2EcHCqS2/P/yGIdFC2N0e/602scESWH0O795HQfEhyCzOr/930nFhN8x9z7/owtGQt2wNT0/pY4HwhvvM3y/6k+IwlpuMjx/7RFKApmtrzw/71LLQhkq7fu/8NRMAdeqK7s/8dYNQZZpqfr/81eOgVUo6Pn/9FjPQRUnp/j/9RpQAVQm5fe/9lvRQNQlZHa/910SQJOkI3V/995TQJNjYXP/uB+UQJJh37J/uGDUgFFgXPD/uKIVAA/e2q8/uSNVgA4cWK0/uaTVwAyallr/umWWwAtY1hZ/uqZXQApXE5P/uudYAAkVEtF/u2gYwAhT0M8/u6kZwAfSjwz/u+oaQAbRTcr/vCsbQAYQjAl/vGvbgAWPysz/vKybgAUOjY2/vO1cQASTT1B/vS3cgAQTDxD/vW4cwAPTD9F/va6dAAOS0FL/ve8dgANS0FM/vi+dwAMS0JN/vm/eAALS0JN/vq/eQAKS0NN/vu/egAJS0NN/vvAfQAIS0RO/vvAfQAHS0RO/vzBfgAGS0RP/vzCfwAFS0RP/vzCfwAES0VP/v3CgAAES0VP/v3CgAAES0VP/v3CgAA=";

export const INITIAL_AUDIO_SUBMISSIONS: AudioSubmission[] = [
  {
    id: "aud-101",
    studentName: "Zeynep Kaya",
    studentEmail: "zeynep.kaya@bilkent.edu.tr",
    examTitle: "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Denemesi #1",
    examCode: "BUEPT",
    targetUniversity: "Boğaziçi Üniversitesi",
    questionNumber: 3,
    promptTitle: "Task 2: Academic Presentation - The Impact of Artificial Intelligence on Higher Education",
    durationSec: 84,
    audioUrl: SAMPLE_AUDIO_URI,
    submittedAt: "Bugün, 14:35",
    status: "GRADED",
    aiScoreBand: 8.0,
    rubric: {
      pronunciation: 8.0,
      fluency: 8.5,
      vocabulary: 8.0,
      grammar: 7.5,
    },
    aiFeedback: "Mükemmel akıcılık ve doğal tonlama. 'Paradigm shift' ve 'pedagogical framework' gibi ileri düzey akademik kelimeler başarıyla kullanıldı.",
    instructorNote: "Ahmet Hoca: Telaffuz ve fikir savunusu Boğaziçi C1 standardını rahatlıkla geçiyor.",
  },
  {
    id: "aud-102",
    studentName: "Can Demir",
    studentEmail: "can.demir@metu.edu.tr",
    examTitle: "ODTÜ İngilizce Yeterlik Sınavı (EPE) - Sesli Mülakat Denemesi #2",
    examCode: "ODTU_IYS",
    targetUniversity: "Orta Doğu Teknik Üniversitesi (ODTÜ)",
    questionNumber: 4,
    promptTitle: "EPE Oral Interview: Urbanization versus Environmental Conservation",
    durationSec: 110,
    audioUrl: SAMPLE_AUDIO_URI,
    submittedAt: "Bugün, 11:20",
    status: "NEEDS_REVIEW",
    aiScoreBand: 7.0,
    rubric: {
      pronunciation: 6.5,
      fluency: 7.0,
      vocabulary: 7.5,
      grammar: 7.0,
    },
    aiFeedback: "Argümanlar mantıklı ve tutarlı. Zıtlık bağlaçlarında (Whereas, On the flip side) hafif duraklamalar mevcut.",
    instructorNote: "Eğitmen incelemesi bekleniyor.",
  },
  {
    id: "aud-103",
    studentName: "Melis Yıldız",
    studentEmail: "melis.yildiz@bilkent.edu.tr",
    examTitle: "Bilkent Üniversitesi PAE Stage 2 Speaking Mülakatı #1",
    examCode: "BILKENT_PAE",
    targetUniversity: "Bilkent Üniversitesi",
    questionNumber: 5,
    promptTitle: "Bilkent PAE: Comparison of Traditional and Remote Workspace Dynamics",
    durationSec: 92,
    audioUrl: SAMPLE_AUDIO_URI,
    submittedAt: "Dün, 17:40",
    status: "APPROVED",
    aiScoreBand: 8.5,
    rubric: {
      pronunciation: 8.5,
      fluency: 8.5,
      vocabulary: 8.5,
      grammar: 8.0,
    },
    aiFeedback: "Bilkent Stage 2 konuşma sınavı için örnek gösterilebilecek seviyede. Telaffuz son derece temiz.",
    instructorNote: "Harika performans, Stage 2 geçme barajı (65) üzerinde.",
  },
  {
    id: "aud-104",
    studentName: "Efe Çelik",
    studentEmail: "efe.celik@koc.edu.tr",
    examTitle: "Koç Üniversitesi KUEPE Akademik Mülakat & Speaking #1",
    examCode: "KOC_KUEPE",
    targetUniversity: "Koç Üniversitesi",
    questionNumber: 3,
    promptTitle: "KUEPE Speaking: Technological Singularity and Ethics",
    durationSec: 68,
    audioUrl: SAMPLE_AUDIO_URI,
    submittedAt: "Dün, 15:15",
    status: "GRADED",
    aiScoreBand: 7.5,
    rubric: {
      pronunciation: 7.5,
      fluency: 7.0,
      vocabulary: 8.0,
      grammar: 7.5,
    },
    aiFeedback: "Kelime zenginliği çok yüksek. Süre yönetimine dikkat edilmeli (45 sn hazırlık süresi tam kullanılmalı).",
    instructorNote: "Koç hazırlık atlama için yeterli düzeyde.",
  },
  {
    id: "aud-105",
    studentName: "Selin Arslan",
    studentEmail: "selin.arslan@gmail.com",
    examTitle: "IELTS Academic Speaking Mock Exam - Part 2 Cue Card",
    examCode: "IELTS",
    targetUniversity: "Uluslararası / IELTS",
    questionNumber: 2,
    promptTitle: "Describe a memorable journey that you took by public transport",
    durationSec: 118,
    audioUrl: SAMPLE_AUDIO_URI,
    submittedAt: "29 Eylül 2026",
    status: "APPROVED",
    aiScoreBand: 7.5,
    rubric: {
      pronunciation: 7.5,
      fluency: 7.5,
      vocabulary: 8.0,
      grammar: 7.0,
    },
    aiFeedback: "2 dakikalık süreyi doldurmayı başardı. Hikayelendirme ve geçmiş zaman kullanımı başarılı.",
    instructorNote: "Band 7.5 hedefi için hazır.",
  },
];

export const INITIAL_DETAILED_REPORTS: ExamDetailedReport[] = [
  {
    id: "rep-1",
    title: "2026 YDT Şampiyonlar Özgün Deneme #1",
    examCode: "YDT",
    hostedDate: "28 Eylül 2026",
    participantsCount: 42,
    accessCode: "904182",
    targetClass: "12-DİL Şampiyonlar",
    averageScore: "68.25 Net",
    weakestTopic: "Grammar::Conditionals (%31 Başarı)",
    strongestTopic: "Reading::Careful_Reading (%88 Başarı)",
    status: "COMPLETED",
    audioCount: 0,
    essayCount: 0,
    studentResults: [
      {
        id: "st-1",
        studentName: "Zeynep Kaya",
        studentEmail: "zeynep.kaya@gmail.com",
        correctCount: 74,
        wrongCount: 6,
        blankCount: 0,
        netScore: 72.5,
        scaledScore: "72.50 Net",
        timeSpentMins: 108,
        weakTopics: ["Grammar::Conditionals"],
      },
      {
        id: "st-2",
        studentName: "Can Demir",
        studentEmail: "can.demir@gmail.com",
        correctCount: 71,
        wrongCount: 8,
        blankCount: 1,
        netScore: 69.0,
        scaledScore: "69.00 Net",
        timeSpentMins: 115,
        weakTopics: ["Vocabulary::Phrasal_Verbs"],
      },
      {
        id: "st-3",
        studentName: "Melis Yıldız",
        studentEmail: "melis.yildiz@gmail.com",
        correctCount: 70,
        wrongCount: 7,
        blankCount: 3,
        netScore: 68.25,
        scaledScore: "68.25 Net",
        timeSpentMins: 119,
        weakTopics: ["Grammar::Conditionals", "Translation::EN_TR"],
      },
      {
        id: "st-4",
        studentName: "Efe Çelik",
        studentEmail: "efe.celik@gmail.com",
        correctCount: 65,
        wrongCount: 12,
        blankCount: 3,
        netScore: 62.0,
        scaledScore: "62.00 Net",
        timeSpentMins: 120,
        weakTopics: ["Reading::Restatement", "Grammar::Prepositions"],
      },
      {
        id: "st-5",
        studentName: "Selin Arslan",
        studentEmail: "selin.arslan@gmail.com",
        correctCount: 63,
        wrongCount: 14,
        blankCount: 3,
        netScore: 59.5,
        scaledScore: "59.50 Net",
        timeSpentMins: 120,
        weakTopics: ["Grammar::Conditionals", "Vocabulary::Synonyms"],
      },
    ],
    questionAnalysis: [
      { questionNumber: 12, subTopic: "Conditionals (Type 3 & Mixed)", domain: "GRAMMAR", successPercentage: 31, mostCommonWrongChoice: "B (Had been)", correctAnswer: "D" },
      { questionNumber: 18, subTopic: "Phrasal Verbs (Turn down, Call off)", domain: "VOCABULARY", successPercentage: 42, mostCommonWrongChoice: "A (Give up)", correctAnswer: "C" },
      { questionNumber: 35, subTopic: "Restatement (Paraphrasing)", domain: "GRAMMAR", successPercentage: 54, mostCommonWrongChoice: "E", correctAnswer: "B" },
      { questionNumber: 52, subTopic: "Paragraph Reading - Main Idea", domain: "READING", successPercentage: 88, mostCommonWrongChoice: "C", correctAnswer: "A" },
      { questionNumber: 68, subTopic: "English to Turkish Translation", domain: "TRANSLATION", successPercentage: 79, mostCommonWrongChoice: "B", correctAnswer: "D" },
    ],
  },
  {
    id: "rep-4",
    title: "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Denemesi #1",
    examCode: "BUEPT",
    hostedDate: "29 Eylül 2026",
    participantsCount: 22,
    accessCode: "770192",
    targetClass: "Boğaziçi & ODTÜ Hazırlık Grubu",
    averageScore: "76.40 Puan",
    weakestTopic: "Listening::Note-Taking (%32 Başarı)",
    strongestTopic: "Writing::TWE_Opinion_Essay (%82 Başarı)",
    status: "COMPLETED",
    audioCount: 22,
    essayCount: 22,
    studentResults: [
      {
        id: "st-b1",
        studentName: "Zeynep Kaya",
        studentEmail: "zeynep.kaya@bilkent.edu.tr",
        correctCount: 35,
        wrongCount: 5,
        blankCount: 0,
        netScore: 82.5,
        scaledScore: "82.50 (B Notu)",
        timeSpentMins: 195,
        audioSubmissionId: "aud-101",
        audioDurationSec: 84,
        audioScoreBand: 8.0,
        essayWordCount: 345,
        essayScoreBand: 8.5,
        essayText: "Artificial Intelligence in modern academia should be perceived as a catalyst rather than a replacement. The pedagogical framework necessitates...",
        weakTopics: ["Listening::Note-Taking"],
      },
      {
        id: "st-b2",
        studentName: "Can Demir",
        studentEmail: "can.demir@metu.edu.tr",
        correctCount: 32,
        wrongCount: 8,
        blankCount: 0,
        netScore: 74.0,
        scaledScore: "74.00 (C Notu)",
        timeSpentMins: 205,
        audioSubmissionId: "aud-102",
        audioDurationSec: 110,
        audioScoreBand: 7.0,
        essayWordCount: 295,
        essayScoreBand: 7.5,
        essayText: "Technological advancements have altered urban structures significantly. However, preserving environmental integrity remains paramount...",
        weakTopics: ["Listening::Note-Taking", "Reading::Search_Reading"],
      },
      {
        id: "st-b3",
        studentName: "Melis Yıldız",
        studentEmail: "melis.yildiz@bilkent.edu.tr",
        correctCount: 34,
        wrongCount: 6,
        blankCount: 0,
        netScore: 79.0,
        scaledScore: "79.00 (B Notu)",
        timeSpentMins: 200,
        audioSubmissionId: "aud-103",
        audioDurationSec: 92,
        audioScoreBand: 8.5,
        essayWordCount: 360,
        essayScoreBand: 8.0,
        essayText: "Traditional learning modalities have provided foundational methodologies for decades. However, adaptive digital architectures offer individualized pacing...",
        weakTopics: ["Listening::Note-Taking"],
      },
    ],
    questionAnalysis: [
      { questionNumber: 15, subTopic: "Note-Taking: Lecture Key Details", domain: "LISTENING", successPercentage: 32, mostCommonWrongChoice: "B (Inaccurate statistic)", correctAnswer: "D" },
      { questionNumber: 8, subTopic: "Search Reading: Paragraph Matching", domain: "READING", successPercentage: 62, mostCommonWrongChoice: "Paragraph 4", correctAnswer: "Paragraph 2" },
      { questionNumber: 22, subTopic: "While-Listening: Interview Comprehension", domain: "LISTENING", successPercentage: 74, mostCommonWrongChoice: "A", correctAnswer: "C" },
      { questionNumber: 38, subTopic: "Task 1 TWE Argumentative Essay", domain: "WRITING", successPercentage: 82, mostCommonWrongChoice: "Under length", correctAnswer: "300+ Words" },
    ],
  },
  {
    id: "rep-2",
    title: "2026 YDS Master Akademik Paragraf & Çeviri",
    examCode: "YDS",
    hostedDate: "25 Eylül 2026",
    participantsCount: 28,
    accessCode: "812044",
    targetClass: "YDS 80+ Master Grubu",
    averageScore: "74.50 Puan",
    weakestTopic: "Vocabulary::Phrasal_Verbs (%28 Başarı)",
    strongestTopic: "Reading::Contextual_Inference (%81 Başarı)",
    status: "COMPLETED",
    audioCount: 0,
    essayCount: 0,
    studentResults: [
      {
        id: "st-y1",
        studentName: "Ahmet Kurt",
        studentEmail: "ahmet.kurt@gmail.com",
        correctCount: 68,
        wrongCount: 12,
        blankCount: 0,
        netScore: 68.0,
        scaledScore: "85.00 Puan",
        timeSpentMins: 160,
        weakTopics: ["Vocabulary::Phrasal_Verbs"],
      },
      {
        id: "st-y2",
        studentName: "Büşra Çetin",
        studentEmail: "busra.cetin@gmail.com",
        correctCount: 62,
        wrongCount: 18,
        blankCount: 0,
        netScore: 62.0,
        scaledScore: "77.50 Puan",
        timeSpentMins: 175,
        weakTopics: ["Grammar::Clauses", "Vocabulary::Phrasal_Verbs"],
      },
    ],
    questionAnalysis: [
      { questionNumber: 6, subTopic: "Phrasal Verbs (Set off, Make out)", domain: "VOCABULARY", successPercentage: 28, mostCommonWrongChoice: "B (Carry out)", correctAnswer: "A" },
      { questionNumber: 27, subTopic: "Noun Clauses & Relative Clauses", domain: "GRAMMAR", successPercentage: 64, mostCommonWrongChoice: "D", correctAnswer: "C" },
      { questionNumber: 44, subTopic: "Academic Paragraph Synthesis", domain: "READING", successPercentage: 81, mostCommonWrongChoice: "A", correctAnswer: "E" },
    ],
  },
  {
    id: "rep-3",
    title: "IELTS Academic Reading & Speaking Mock - 4 Becerili",
    examCode: "IELTS",
    hostedDate: "Canlı Yayında",
    participantsCount: 15,
    accessCode: "614092",
    targetClass: "IELTS Band 7.5 Kulübü",
    averageScore: "Band 6.5 (Ort)",
    weakestTopic: "Reading::True_False_NG",
    strongestTopic: "Speaking::Fluency_Band (%78 Başarı)",
    status: "RUNNING",
    audioCount: 15,
    essayCount: 12,
    studentResults: [
      {
        id: "st-i1",
        studentName: "Selin Arslan",
        studentEmail: "selin.arslan@gmail.com",
        correctCount: 33,
        wrongCount: 7,
        blankCount: 0,
        netScore: 33.0,
        scaledScore: "Band 7.5",
        timeSpentMins: 60,
        audioSubmissionId: "aud-105",
        audioDurationSec: 118,
        audioScoreBand: 7.5,
        essayWordCount: 280,
        essayScoreBand: 7.0,
        essayText: "The graph illustrates the global consumption of energy sources between 2000 and 2025. It is noticeable that renewable sources have witnessed a dramatic upturn...",
        weakTopics: ["Reading::True_False_NG"],
      },
    ],
    questionAnalysis: [
      { questionNumber: 8, subTopic: "Reading: True / False / Not Given", domain: "READING", successPercentage: 45, mostCommonWrongChoice: "FALSE (B)", correctAnswer: "NOT GIVEN (C)" },
      { questionNumber: 19, subTopic: "Reading: Headings Matching", domain: "READING", successPercentage: 68, mostCommonWrongChoice: "Heading IV", correctAnswer: "Heading II" },
    ],
  },
];
