"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Star,
  Award,
  Layers,
  Mic,
  BookOpen,
  Clock,
  HelpCircle,
  ExternalLink
} from "lucide-react";

export interface PricingExamOption {
  id: string;
  name: string;
  tag: string;
  poolDescription: string;
  marketNote: string;
  badgeColor: string;
}

export const EXAM_OPTIONS: PricingExamOption[] = [
  { 
    id: "YDT", 
    name: "YDT (YKS-Dil)", 
    tag: "ÖSYM / Lise", 
    poolDescription: "80 Soruluk YKS-Dil özgün soru ve deneme havuzu",
    marketNote: "Lise ve mezun adaylara özel: Piyasa ortalamasının altında, öğrenci dostu ekonomik birim fiyat.",
    badgeColor: "#3b82f6"
  },
  { 
    id: "YDS", 
    name: "YDS & YÖKDİL", 
    tag: "ÖSYM / Akademik", 
    poolDescription: "Akademik Paragraf, Çeviri ve Cümle Tamamlama soru havuzu",
    marketNote: "Akademik personel ve kamu adaylarına özel: 80 soruluk e-YDS standartlarında prova.",
    badgeColor: "#8b5cf6"
  },
  { 
    id: "BUEPT", 
    name: "Boğaziçi BUEPT", 
    tag: "Hazırlık Atlama", 
    poolDescription: "BÜYES Dinleme, Okuma & TWE Essay Kompozisyon soru havuzu",
    marketNote: "Piyasada ₺10.000+ olan BUEPT kurslarına alternatif: Note-Taking ve Yapay Zeka TWE Essay puanlaması dahil.",
    badgeColor: "#0284c7"
  },
  { 
    id: "ODTU_IYS", 
    name: "ODTÜ / İTÜ İYS", 
    tag: "Hazırlık Atlama", 
    poolDescription: "EPE & İYS Seviye Muafiyet tam deneme havuzu",
    marketNote: "Restatement, Reading for Academic Purposes ve Dinleyerek Not Alma simülasyonu.",
    badgeColor: "#b91c1c"
  },
  { 
    id: "PROFICIENCY", 
    name: "Bilkent & Koç PAE", 
    tag: "Hazırlık Atlama", 
    poolDescription: "PAE / KUEPE dil yeterlik sınav havuzu",
    marketNote: "Vakıf üniversiteleri hazırlık atlama formatında Writing & Speaking değerlendirme rubriği.",
    badgeColor: "#4f46e5"
  },
  { 
    id: "IELTS", 
    name: "IELTS Academic", 
    tag: "Uluslararası", 
    poolDescription: "Band 7.5+ 4 Beceri ve Ses Kayıtlı Speaking havuzu",
    marketNote: "Resmi sınav ücreti ₺12.000+ olan IELTS için: Mikrofonlu Speaking ve Task 1-2 Writing puanlaması.",
    badgeColor: "#e11d48"
  },
  { 
    id: "TOEFL", 
    name: "TOEFL iBT", 
    tag: "Uluslararası", 
    poolDescription: "Yeni nesil entegre Speaking & Writing soru havuzu",
    marketNote: "ETS standartlarında Writing for Academic Discussion ve 4 entegre konuşma simülasyonu.",
    badgeColor: "#7c3aed"
  },
];

export interface ExamPackage {
  count: 5 | 10 | 15 | 20;
  title: string;
  price: number;
  perExamPrice: number;
  discountBadge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface ExamMockPreview {
  id: string;
  title: string;
  questions: string;
  duration: string;
  focus: string;
  badge: string;
}

// Researched Market Pricing for each Exam Category
export const EXAM_PRICING_MAP: Record<string, ExamPackage[]> = {
  YDT: [
    {
      count: 5,
      title: "5 YDT Deneme Paketi",
      price: 149,
      perExamPrice: 29.8,
      features: [
        "5 adet 80 soruluk özgün YDT denemesi",
        "ÖSYM formatında anlık optik karne & net hesabı",
        "Adaptif '1 Soru Daha' IRT telafi soruları",
        "Detaylı soru çözüm açıklamaları",
        "45 gün havuz erişim süresi"
      ]
    },
    {
      count: 10,
      title: "10 YDT Deneme Paketi",
      price: 269,
      perExamPrice: 26.9,
      discountBadge: "%10 Tasarruf",
      isPopular: true,
      features: [
        "10 adet 80 soruluk özgün YDT denemesi",
        "Akıllı Kelime Kartları (YDT C1/B2 setleri)",
        "Zayıf kazanım analizi (Phrasal verbs, Tenses)",
        "90 gün havuz erişim süresi",
        "100 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 YDT Deneme Paketi",
      price: 369,
      perExamPrice: 24.6,
      discountBadge: "%18 Tasarruf",
      features: [
        "15 adet tam kapsamlı YDT denemesi",
        "Tüm dilbilgisi ve paragraf telafi soruları",
        "Türkiye geneli sıralama simülasyonu",
        "180 gün havuz erişim süresi",
        "250 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 YDT Şampiyon Paketi",
      price: 449,
      perExamPrice: 22.5,
      discountBadge: "%25 Tasarruf",
      features: [
        "20 adet eksiksiz YDT deneme havuzu",
        "YKS gününe kadar 365 gün sınırsız erişim",
        "Yapay zeka zayıf konu reçetesi",
        "Veli & Öğretmen PDF karne paylaşımı",
        "500 Jeton 1v1 Düello VIP kredisi"
      ]
    }
  ],

  YDS: [
    {
      count: 5,
      title: "5 YDS/YÖKDİL Paketi",
      price: 199,
      perExamPrice: 39.8,
      features: [
        "5 adet 80 soruluk akademik YDS denemesi",
        "Akademik kelime ve çeviri analizleri",
        "Adaptif '1 Soru Daha' IRT telafi motoru",
        "Madde güçlüğü ve çeldirici analizleri",
        "45 gün havuz erişim süresi"
      ]
    },
    {
      count: 10,
      title: "10 YDS/YÖKDİL Paketi",
      price: 349,
      perExamPrice: 34.9,
      discountBadge: "%12 Tasarruf",
      isPopular: true,
      features: [
        "10 adet özgün akademik YDS/YÖKDİL denemesi",
        "Sosyal, Sağlık, Fen özel paragraf modülleri",
        "Akademik Collocations flashcard seti",
        "90 gün havuz erişim süresi",
        "100 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 YDS/YÖKDİL Paketi",
      price: 479,
      perExamPrice: 31.9,
      discountBadge: "%20 Tasarruf",
      features: [
        "15 adet tam deneme ve soru çözüm arşivi",
        "ÖSYM çeldirici stratejileri analizi",
        "Sınırsız telafi soru havuzu",
        "180 gün havuz erişim süresi",
        "250 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 YDS Master Paketi",
      price: 589,
      perExamPrice: 29.5,
      discountBadge: "%26 Tasarruf",
      features: [
        "20 adet 80 soruluk dev YDS deneme arşivi",
        "365 gün tam havuz erişimi",
        "Detaylı CEFR C1/B2 yetkinlik karnesi",
        "PDF çıktı ve detaylı soru video/metin çözümü",
        "500 Jeton 1v1 Düello VIP kredisi"
      ]
    }
  ],

  BUEPT: [
    {
      count: 5,
      title: "5 BUEPT Muafiyet Paketi",
      price: 299,
      perExamPrice: 59.8,
      features: [
        "5 adet tam BUEPT / BÜYES denemesi (Search Reading)",
        "15 dk ses kayıtlı gerçek Note-Taking dersi",
        "Yapay zeka TWE Academic Essay puanlaması",
        "60 gün havuz erişim süresi",
        "Boğaziçi YADYOK standartlarında rubrik"
      ]
    },
    {
      count: 10,
      title: "10 BUEPT Muafiyet Paketi",
      price: 529,
      perExamPrice: 52.9,
      discountBadge: "%12 Tasarruf",
      isPopular: true,
      features: [
        "10 adet orijinal BUEPT deneme simülasyonu",
        "Sınırsız Essay (Writing) AI analizi & geri bildirimi",
        "Ses kayıtlı While-Listening & Note-Taking dersleri",
        "120 gün havuz erişim süresi",
        "150 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 BUEPT Muafiyet Paketi",
      price: 719,
      perExamPrice: 47.9,
      discountBadge: "%20 Tasarruf",
      features: [
        "15 adet tam kapsamlı Boğaziçi hazırlık atlama denemesi",
        "Detaylı hata düzeltmeli Essay rubrik karnesi",
        "Akademik Reading kelime ve argüman modülü",
        "180 gün havuz erişim süresi",
        "300 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 BUEPT Şampiyon Paketi",
      price: 899,
      perExamPrice: 44.9,
      discountBadge: "%25 Tasarruf",
      features: [
        "20 adet eksiksiz BUEPT sınav arşivi",
        "1 yıl boyunca sınav dönemlerine kadar sınırsız erişim",
        "Öncelikli AI Essay geri bildirim sırası",
        "Boğaziçi hazırlık sınıfını tek seferde atlama garantisi yaklaşımı",
        "500 Jeton VIP Kredisi"
      ]
    }
  ],

  ODTU_IYS: [
    {
      count: 5,
      title: "5 ODTÜ/İTÜ İYS Paketi",
      price: 279,
      perExamPrice: 55.8,
      features: [
        "5 adet 60 soruluk tam İYS denemesi",
        "Restatement ve Paragraph Completion analizi",
        "Ses kayıtlı Note-Taking dinleme bölümü",
        "60 gün havuz erişim süresi",
        "Standart soru çözüm açıklamaları"
      ]
    },
    {
      count: 10,
      title: "10 ODTÜ/İTÜ İYS Paketi",
      price: 499,
      perExamPrice: 49.9,
      discountBadge: "%11 Tasarruf",
      isPopular: true,
      features: [
        "10 adet özgün ODTÜ EPE & İTÜ İYS denemesi",
        "Yapay zeka Academic Essay geri bildirimi",
        "İYS kelime dağarcığı ve bağlaç testleri",
        "120 gün havuz erişim süresi",
        "150 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 ODTÜ/İTÜ İYS Paketi",
      price: 669,
      perExamPrice: 44.6,
      discountBadge: "%20 Tasarruf",
      features: [
        "15 adet tam kapsamlı İYS denemesi",
        "Tüm dinleme ve okuma telafi modülleri",
        "Gelişmiş optik karne ve eksik konu analitiği",
        "180 gün havuz erişim süresi",
        "300 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 İYS Muafiyet Şampiyonu",
      price: 849,
      perExamPrice: 42.4,
      discountBadge: "%24 Tasarruf",
      features: [
        "20 adet eksiksiz ODTÜ & İTÜ İYS denemesi",
        "365 gün tam havuz erişimi",
        "Sınırsız Writing kompozisyon değerlendirmesi",
        "Üniversite muafiyet başarı karnesi",
        "500 Jeton VIP Kredisi"
      ]
    }
  ],

  PROFICIENCY: [
    {
      count: 5,
      title: "5 Muafiyet (PAE) Paketi",
      price: 289,
      perExamPrice: 57.8,
      features: [
        "5 adet ileri düzey akademik yeterlik denemesi",
        "Writing Task ve Speaking mülakat rubriği",
        "Akademik dinleme ve not alma alıştırması",
        "60 gün havuz erişim süresi",
        "Üniversiteye özel baraj puan simülasyonu"
      ]
    },
    {
      count: 10,
      title: "10 Muafiyet (PAE) Paketi",
      price: 519,
      perExamPrice: 51.9,
      discountBadge: "%10 Tasarruf",
      isPopular: true,
      features: [
        "10 adet kapsamlı PAE & KUEPE denemesi",
        "Ses kayıtlı Speaking simülatörü",
        "AI Essay detaylı geri bildirimi",
        "120 gün havuz erişim süresi",
        "150 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 Muafiyet (PAE) Paketi",
      price: 699,
      perExamPrice: 46.6,
      discountBadge: "%20 Tasarruf",
      features: [
        "15 adet tam deneme havuzu",
        "Tüm becerilerde anlık telafi ve zayıf nokta analitiği",
        "Akademik kelime flashcard desteği",
        "180 gün havuz erişim süresi",
        "300 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 PAE Şampiyon Paketi",
      price: 879,
      perExamPrice: 43.9,
      discountBadge: "%24 Tasarruf",
      features: [
        "20 adet tam deneme arşivi",
        "365 gün sınırsız havuz erişimi",
        "Sınırsız Writing ve Speaking denemesi",
        "Hazırlık muafiyet başarı raporu",
        "500 Jeton VIP Kredisi"
      ]
    }
  ],

  IELTS: [
    {
      count: 5,
      title: "5 IELTS Academic Paketi",
      price: 399,
      perExamPrice: 79.8,
      features: [
        "5 tam IELTS simülasyonu (Reading, Listening, Writing, Speaking)",
        "Ses kayıtlı Speaking simülatörü & akıcılık analizi",
        "Task 1 (Grafik) & Task 2 (Essay) yapay zeka puanlaması",
        "Resmi Band 0.0 - 9.0 puanlama algoritması",
        "60 gün havuz erişim süresi"
      ]
    },
    {
      count: 10,
      title: "10 IELTS Academic Paketi",
      price: 699,
      perExamPrice: 69.9,
      discountBadge: "%13 Tasarruf",
      isPopular: true,
      features: [
        "10 tam 4 beceri IELTS Academic denemesi",
        "Sınırsız mikrofon kayıtlı Speaking değerlendirmesi",
        "Detaylı Lexical Resource & Grammatical Range analitiği",
        "120 gün havuz erişim süresi",
        "200 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 IELTS Academic Paketi",
      price: 949,
      perExamPrice: 63.2,
      discountBadge: "%21 Tasarruf",
      features: [
        "15 tam IELTS Academic denemesi",
        "Akademik kelime ve telaffuz iyileştirme tavsiyeleri",
        "Band 7.5+ hedefleyenler için ileri modül",
        "180 gün havuz erişim süresi",
        "350 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 IELTS Band 8.0+ Master",
      price: 1199,
      perExamPrice: 59.9,
      discountBadge: "%25 Tasarruf",
      features: [
        "20 tam kapsamlı IELTS deneme arşivi",
        "365 gün sınırsız erişim",
        "Sınırsız Speaking & Writing telafi seansları",
        "Resmi British Council / IDP formatıyla %100 uyumlu",
        "600 Jeton VIP Kredisi"
      ]
    }
  ],

  TOEFL: [
    {
      count: 5,
      title: "5 TOEFL iBT Paketi",
      price: 389,
      perExamPrice: 77.8,
      features: [
        "5 tam TOEFL iBT denemesi (Yeni nesil kısa format)",
        "Speaking mikrofon kaydı ve ETS uyumlu rubrik",
        "Writing for Academic Discussion yapay zeka değerlendirmesi",
        "0-120 ölçekli anlık puan simülasyonu",
        "60 gün havuz erişim süresi"
      ]
    },
    {
      count: 10,
      title: "10 TOEFL iBT Paketi",
      price: 679,
      perExamPrice: 67.9,
      discountBadge: "%13 Tasarruf",
      isPopular: true,
      features: [
        "10 tam TOEFL iBT simülasyonu",
        "Entegre ve bağımsız tüm görevlerde AI sesli geri bildirim",
        "Akademik dinleme hız ve not alma antrenmanı",
        "120 gün havuz erişim süresi",
        "200 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 15,
      title: "15 TOEFL iBT Paketi",
      price: 919,
      perExamPrice: 61.2,
      discountBadge: "%21 Tasarruf",
      features: [
        "15 tam TOEFL iBT denemesi",
        "Sınırsız konuşma ve yazma telafi görevleri",
        "Zayıf entegre beceri analitiği",
        "180 gün havuz erişim süresi",
        "350 Jeton 1v1 Düello hediyesi"
      ]
    },
    {
      count: 20,
      title: "20 TOEFL 100+ Master",
      price: 1149,
      perExamPrice: 57.4,
      discountBadge: "%26 Tasarruf",
      features: [
        "20 tam TOEFL iBT sınav arşivi",
        "365 gün sınırsız erişim",
        "100+ hedef puan optimizasyon koçu",
        "ETS formatında eksiksiz optik & yazılı rapor",
        "600 Jeton VIP Kredisi"
      ]
    }
  ]
};

// Exam-specific Mock Exams Catalog Preview
export const EXAM_MOCKS_PREVIEW: Record<string, ExamMockPreview[]> = {
  YDT: [
    {
      id: "mock-ydt-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      questions: "80 Soru",
      duration: "120 Dk",
      focus: "Gramer, Çeviri, Paragraf ve Cümle Tamamlama",
      badge: "ÖSYM Formatı"
    },
    {
      id: "mock-ydt-2",
      title: "2026 YDT Gramer & Paragraf Odaklı Seviye Denemesi #2",
      questions: "80 Soru",
      duration: "120 Dk",
      focus: "Phrasal Verbs, Tenses ve Okuduğunu Anlama",
      badge: "Zor Seviye"
    },
    {
      id: "mock-ydt-3",
      title: "2026 YDT ÖSYM Birebir Çıkmış Tarzı Genel Prova #3",
      questions: "80 Soru",
      duration: "120 Dk",
      focus: "Madde Güçlüğü Analizi ve Türkiye Geneli Sıralama",
      badge: "Genel Prova"
    }
  ],

  YDS: [
    {
      id: "mock-yds-1",
      title: "2026 YDS Master Akademik Paragraf & Çeviri Denemesi #1",
      questions: "80 Soru",
      duration: "180 Dk",
      focus: "Akademik Metinler, Çeviri ve Anlam Bütünlüğü",
      badge: "e-YDS Standart"
    },
    {
      id: "mock-yds-2",
      title: "2026 YÖKDİL Sosyal & Fen Bilimleri Karma Denemesi #2",
      questions: "80 Soru",
      duration: "180 Dk",
      focus: "Sosyal, Sağlık ve Fen Alanı Terminolojisi",
      badge: "YÖKDİL Odaklı"
    },
    {
      id: "mock-yds-3",
      title: "2026 YDS / e-YDS İleri Düzey Taktik Prova Denemesi #3",
      questions: "80 Soru",
      duration: "180 Dk",
      focus: "Çeldirici Eleme ve Hızlı Okuma Taktikleri",
      badge: "85+ Hedef"
    }
  ],

  BUEPT: [
    {
      id: "mock-buept-1",
      title: "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Özgün Deneme #1",
      questions: "40 Soru + 2 Essay",
      duration: "210 Dk",
      focus: "Search Reading, 15 dk Note-Taking & TWE Essay",
      badge: "BÜYES Orijinal"
    },
    {
      id: "mock-buept-2",
      title: "2026 Boğaziçi BÜYES Reading & TWE Writing Tam Simülasyonu #2",
      questions: "40 Soru + Writing",
      duration: "210 Dk",
      focus: "Careful Reading, Search Reading ve Argüman Essay",
      badge: "YADYOK Rubriği"
    },
    {
      id: "mock-buept-3",
      title: "2026 Boğaziçi BUEPT Dinleme (While-Listening) & Muafiyet Denemesi #3",
      questions: "Note-Taking & Test",
      duration: "180 Dk",
      focus: "Akademik Ders Dinleme, Not Alma ve Soru Çözümü",
      badge: "Dinleme Lab"
    }
  ],

  ODTU_IYS: [
    {
      id: "mock-odtu-1",
      title: "2026 ODTÜ & İTÜ Seviye İYS Hazırlık Muafiyet Tam Deneme #1",
      questions: "60 Soru + Essay",
      duration: "165 Dk",
      focus: "Restatement, Note-Taking Dinleme & Düşünce Yazısı",
      badge: "EPE & İYS"
    },
    {
      id: "mock-odtu-2",
      title: "2026 ODTÜ EPE Restatement & Academic Reading Denemesi #2",
      questions: "60 Soru",
      duration: "150 Dk",
      focus: "Cümle Anlam Eşleştirme ve Paragraf Analizi",
      badge: "ODTÜ EPE"
    },
    {
      id: "mock-odtu-3",
      title: "2026 İTÜ İYS Note-Taking & Düşünce Yazısı Simülasyonu #3",
      questions: "55 Soru + Writing",
      duration: "165 Dk",
      focus: "İTÜ Yabancı Diller Note-Taking ve Akademik Kompozisyon",
      badge: "İTÜ İYS"
    }
  ],

  PROFICIENCY: [
    {
      id: "mock-prof-1",
      title: "2026 Genel Üniversite Hazırlık Atlama (Proficiency) Karma Deneme #1",
      questions: "65 Soru + Essay",
      duration: "150 Dk",
      focus: "Akademik Okuma, Dinleme ve Düşünce Yazısı",
      badge: "Karma Muafiyet"
    },
    {
      id: "mock-bilkent-1",
      title: "2026 Bilkent & Koç Seviye PAE / KUEPE İngilizce Yeterlik Denemesi #1",
      questions: "55 Soru + Speaking",
      duration: "180 Dk",
      focus: "İleri Okuma, Mülakat ve Karşılaştırmalı Essay",
      badge: "Bilkent PAE"
    }
  ],

  IELTS: [
    {
      id: "mock-ielts-1",
      title: "2026 IELTS Academic Tam Kapsamlı 4 Beceri Simülasyonu #1",
      questions: "40 Soru + 2 Task + Sesli",
      duration: "165 Dk",
      focus: "Reading, Listening, Task 1-2 ve Mikrofonlu Speaking",
      badge: "Band 9.0 Standardı"
    },
    {
      id: "mock-ielts-2",
      title: "2026 IELTS Academic Band 7.5+ Writing Task 1-2 & Speaking Lab #2",
      questions: "Writing & Speaking",
      duration: "90 Dk",
      focus: "Grafik Yorumlama, Argüman Kompozisyonu ve Akıcılık",
      badge: "Writing & Speaking"
    },
    {
      id: "mock-ielts-3",
      title: "2026 IELTS Reading & Listening Hızlı Zaman Yönetimi Provası #3",
      questions: "80 Soru (R+L)",
      duration: "120 Dk",
      focus: "Zorlu Akademik Pasajlar ve Çoklu Aksan Dinleme",
      badge: "Hız & Zaman"
    }
  ],

  TOEFL: [
    {
      id: "mock-toefl-1",
      title: "2026 TOEFL iBT Yeni Nesil Mikrofonlu Konuşma & Yazma Denemesi #1",
      questions: "56 Soru + 4 Konuşma",
      duration: "116 Dk",
      focus: "ETS Standartlarında Entegre Speaking & Academic Discussion",
      badge: "Yeni Format"
    },
    {
      id: "mock-toefl-2",
      title: "2026 TOEFL iBT Academic Discussion & Integrated Listening Denemesi #2",
      questions: "Discussion & Dinleme",
      duration: "116 Dk",
      focus: "Forum Tartışması Yazısı ve Kampüs Diyalogları",
      badge: "Writing Forum"
    },
    {
      id: "mock-toefl-3",
      title: "2026 TOEFL iBT 100+ Skor Hedefli Tam Sınav Provası #3",
      questions: "Tam Simülasyon",
      duration: "116 Dk",
      focus: "100+ Puan Barajı Hedefli İleri Okuma & Konuşma",
      badge: "100+ Hedef"
    }
  ]
};

export function PricingSection() {
  const router = useRouter();
  const [selectedExamId, setSelectedExamId] = useState("YDT");
  const [selectedPackage, setSelectedPackage] = useState<ExamPackage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout form state
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installment, setInstallment] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentExam = EXAM_OPTIONS.find((e) => e.id === selectedExamId) || EXAM_OPTIONS[0];
  const currentPackages = EXAM_PRICING_MAP[selectedExamId] || EXAM_PRICING_MAP.YDT;
  const currentMocks = EXAM_MOCKS_PREVIEW[selectedExamId] || [];

  const handleSelectExam = (examId: string) => {
    setSelectedExamId(examId);
    if (typeof window !== "undefined") {
      localStorage.setItem("1mq_active_exam_pool", examId);
    }
  };

  const handleOpenCheckout = (pkg: ExamPackage) => {
    setSelectedPackage(pkg);
    setIsCheckoutOpen(true);
    setPaymentSuccess(false);
  };

  const handleNavigateToStudent = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("1mq_active_exam_pool", selectedExamId);
      localStorage.setItem("1mq_target_exams", JSON.stringify([selectedExamId]));
    }
    router.push(`/student?exam=${selectedExamId}`);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Save purchased package and active exam pool to localStorage
      if (typeof window !== "undefined") {
        const existingData = JSON.parse(localStorage.getItem("1morequiz_user") || "{}");
        existingData.purchasedPackage = {
          examId: selectedExamId,
          examName: currentExam.name,
          mockCount: selectedPackage?.count,
          amountPaid: selectedPackage?.price,
          purchasedAt: new Date().toISOString(),
        };
        existingData.tokens = (existingData.tokens || 500) + (selectedPackage?.count || 5) * 50;
        localStorage.setItem("1morequiz_user", JSON.stringify(existingData));
        localStorage.setItem("1mq_active_exam_pool", selectedExamId);
        localStorage.setItem("1mq_target_exams", JSON.stringify([selectedExamId]));
      }
    }, 1200);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-[760px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[200px] bg-[#edefff] border border-[#d9dde8] text-[#4255ff] text-[12px] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SINAVA ÖZEL PİYASA ARAŞTIRMALI DİNAMİK FİYATLANDIRMA</span>
        </div>
        <h2 className="text-[32px] sm:text-[40px] font-bold text-[#282e3e] tracking-tight leading-[1.2]">
          Hedef Sınavınızı Seçin, <br className="hidden sm:inline" />
          <span className="text-[#4255ff]">Yalnızca O Sınavın Havuzuna Erişin.</span>
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#586380] leading-[24px] font-normal">
          Her sınavın soru sayısı, hazırlık maliyeti ve beceri gereksinimleri farklıdır. 
          YDT'den Boğaziçi BUEPT ve IELTS'e kadar her sınav için piyasa şartlarına göre optimize edilmiş 
          <strong> 5, 10, 15 ve 20 denemelik </strong> paketler.
        </p>
      </div>

      {/* 1. EXAM POOL SELECTOR BAR (Quizlet Pill Horizontal Filter) */}
      <div className="space-y-3">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-[#586380] text-center">
          1. Adım: Hazırlanmak İstediğiniz Sınavı Seçin
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
          {EXAM_OPTIONS.map((exam) => {
            const isSelected = selectedExamId === exam.id;
            return (
              <button
                key={exam.id}
                onClick={() => handleSelectExam(exam.id)}
                className={`px-4 py-2 rounded-[200px] text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-[#4255ff] border-[#4255ff] text-white shadow-[0_2px_8px_rgba(66,85,255,0.25)]"
                    : "bg-white border-[#d9dde8] text-[#282e3e] hover:border-[#4255ff] hover:bg-[#edefff]/50"
                }`}
              >
                <span>{exam.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#f6f7fb] text-[#586380]"
                }`}>
                  {exam.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Exam Information Banner */}
        <div className="max-w-3xl mx-auto p-3.5 rounded-[8px] bg-[#edefff]/70 border border-[#d9dde8] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4255ff] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {currentExam.id.slice(0, 3)}
            </div>
            <div>
              <div className="font-bold text-[#282e3e]">
                Seçili Havuz: {currentExam.name}
              </div>
              <div className="text-[#586380] text-[12px]">
                {currentExam.marketNote}
              </div>
            </div>
          </div>
          <button
            onClick={handleNavigateToStudent}
            className="text-[12px] font-semibold text-[#4255ff] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Doğrudan Denemelere Git</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. THE 4 PRICING CARDS (5, 10, 15, 20 Deneme - DYNAMIC BASED ON EXAM) */}
      <div className="space-y-3">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-[#586380] text-center">
          2. Adım: Deneme Paket Sayınızı Belirleyin
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {currentPackages.map((pkg) => {
            return (
              <div
                key={pkg.count}
                className={`rounded-[8px] bg-white border p-6 flex flex-col justify-between space-y-6 transition-all hover:shadow-[0_8px_24px_rgba(40,46,62,0.12)] relative ${
                  pkg.isPopular
                    ? "border-[#4255ff] ring-2 ring-[#4255ff]/20 shadow-[0_4px_16px_rgba(66,85,255,0.12)]"
                    : "border-[#d9dde8] hover:border-[#4255ff]"
                }`}
              >
                {/* Top Badges */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#4255ff] uppercase tracking-wider bg-[#edefff] px-2.5 py-0.5 rounded-[200px]">
                      {currentExam.id} HAVUZU
                    </span>
                    {pkg.discountBadge && (
                      <span className="text-[11px] font-bold text-[#00838f] bg-[#e0f7fa] px-2 py-0.5 rounded-[200px]">
                        {pkg.discountBadge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-[#282e3e]">
                      {pkg.title}
                    </h3>
                    <div className="text-[12px] text-[#586380] mt-0.5">
                      {currentExam.name} özgün denemeleri
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="pt-2 border-t border-[#d9dde8]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[34px] font-bold text-[#282e3e] tracking-tight">
                        ₺{pkg.price}
                      </span>
                      <span className="text-[13px] text-[#586380] font-normal">
                        / paket
                      </span>
                    </div>
                    <div className="text-[12px] text-[#586380] font-medium mt-0.5">
                      Deneme başı sadece <strong>₺{pkg.perExamPrice}</strong>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 pt-3 border-t border-[#d9dde8]/80 text-[13px] text-[#2e3856]">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#4255ff] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button: Signature 200px Pill Button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleOpenCheckout(pkg)}
                    className={`w-full py-2.5 rounded-[200px] font-semibold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_4px_rgba(40,46,62,0.1)] ${
                      pkg.isPopular
                        ? "bg-[#4255ff] hover:bg-[#3444e5] text-white"
                        : "bg-[#282e3e] hover:bg-[#1f2430] text-white"
                    }`}
                  >
                    <span>Hemen Satın Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. EXAM-SPECIFIC MOCK EXAMS LIST (Sadece Seçilen Sınavın Denemeleri Listelenir) */}
      <div className="p-6 sm:p-8 rounded-[12px] bg-white border border-[#d9dde8] shadow-[0_2px_8px_rgba(40,46,62,0.06)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d9dde8]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#4255ff] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Seçtiğiniz Havuzdaki Denemeler</span>
            </div>
            <h3 className="text-[22px] font-bold text-[#282e3e]">
              {currentExam.name} Soru & Deneme Kataloğu
            </h3>
            <p className="text-[13px] text-[#586380]">
              Bu paketi satın aldığınızda yalnızca aşağıdaki <strong>{currentExam.name}</strong> denemelerine ve telafi sorularına erişirsiniz.
            </p>
          </div>

          <button
            onClick={handleNavigateToStudent}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[13px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all cursor-pointer shrink-0"
          >
            <span>Tüm {currentExam.name} Denemelerini Çöz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Mocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentMocks.map((mock, idx) => (
            <div
              key={mock.id}
              className="p-4 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8] hover:border-[#4255ff] hover:bg-white transition-all space-y-3 flex flex-col justify-between group cursor-pointer"
              onClick={handleNavigateToStudent}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[200px] bg-white border border-[#d9dde8] text-[#586380]">
                    Deneme #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[200px] bg-[#edefff] text-[#4255ff]">
                    {mock.badge}
                  </span>
                </div>

                <h4 className="text-[15px] font-bold text-[#282e3e] group-hover:text-[#4255ff] transition-colors leading-snug">
                  {mock.title}
                </h4>

                <p className="text-[12px] text-[#586380] line-clamp-2">
                  {mock.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-[#d9dde8]/80 flex items-center justify-between text-[12px] text-[#586380]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#939bb4]" />
                    <span>{mock.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{mock.questions}</span>
                </div>
                <span className="font-semibold text-[#4255ff] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>Başla</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Guarantee Box */}
      <div className="p-4 rounded-[8px] bg-white border border-[#d9dde8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#586380] max-w-4xl mx-auto shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-[#282e3e]">Paynkolay 256-Bit SSL Koruması:</strong> Tüm ödemeler 3D Secure güvencesiyle anında işlenir. Kart bilgileriniz asla saklanmaz.
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-[11px] font-semibold text-[#282e3e]">
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Mastercard</span>
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Visa</span>
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Troy</span>
        </div>
      </div>

      {/* 4. PAYNKOLAY CHECKOUT MODAL */}
      {isCheckoutOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-[500px] bg-white rounded-[12px] border border-[#d9dde8] shadow-[0_8px_32px_rgba(40,46,62,0.15)] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#d9dde8]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#4255ff]" />
                <h3 className="text-[16px] font-bold text-[#282e3e]">
                  Paynkolay Güvenli Ödeme
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f6f7fb] text-[#586380] hover:text-[#282e3e] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {paymentSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-[22px] font-bold text-[#282e3e]">
                  Ödemeniz Başarıyla Alındı!
                </h3>
                <p className="text-[14px] text-[#586380] leading-[22px]">
                  <strong>{currentExam.name}</strong> sınav havuzunuz için <strong>{selectedPackage.title}</strong> hesabınıza tanımlandı.
                  Artık sadece {currentExam.name} denemeleri listelenecek.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      handleNavigateToStudent();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all cursor-pointer"
                  >
                    <span>{currentExam.name} Denemelerine Git</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Order Summary Box */}
                <div className="p-3.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] space-y-1.5 text-[13px]">
                  <div className="flex items-center justify-between text-[#282e3e] font-semibold">
                    <span>{selectedPackage.title} ({currentExam.name})</span>
                    <span>₺{selectedPackage.price}.00</span>
                  </div>
                  <div className="flex items-center justify-between text-[#586380] text-[12px]">
                    <span>Kapsam: {selectedPackage.count} Adet Tam Deneme & Telafi</span>
                    <span className="text-emerald-700 font-semibold">KDV Dahil</span>
                  </div>
                  <div className="text-[11px] text-[#4255ff] pt-1">
                    ✓ Erişim yetkisi: Sadece {currentExam.name} soru havuzu
                  </div>
                </div>

                {/* Credit Card Form */}
                <form onSubmit={handlePaySubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ad Soyad"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Kart Numarası
                    </label>
                    <div className="relative flex items-center">
                      <CreditCard className="absolute left-3 w-4 h-4 text-[#939bb4]" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#282e3e]">
                        Son Kullanma
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="AA/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all text-center font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#282e3e]">
                        CVV / Güvenlik Kodu
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Taksit Seçeneği
                    </label>
                    <select
                      value={installment}
                      onChange={(e) => setInstallment(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[13px] text-[#282e3e] bg-white focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                    >
                      <option value="1">Tek Çekim (₺{selectedPackage.price}.00)</option>
                      <option value="3">3 Taksit (3 x ₺{Math.round(selectedPackage.price / 3)}.00)</option>
                      <option value="6">6 Taksit (6 x ₺{Math.round(selectedPackage.price / 6)}.00)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-3 py-3 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        <span>Paynkolay 3D Secure İletişimi Kuruluyor...</span>
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>₺{selectedPackage.price}.00 Güvenle Öde</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#586380] text-center">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit SSL Güvenli Paynkolay / Aktif Bank Sanal POS Altyapısı</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
