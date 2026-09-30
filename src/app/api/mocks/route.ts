import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        mockExams: {
          where: { isPublished: true },
          include: {
            exam: true,
          },
        },
      },
    });

    let mockExams = await prisma.mockExam.findMany({
      where: { isPublished: true },
      include: {
        exam: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Curated catalog of mock exams covering National, University Prep-Skip, and International systems
    const universityAndIntlMocks = [
      {
        id: "mock-buept-1",
        examId: "exam-buept",
        title: "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Özgün Deneme #1",
        description: "Search Reading, 15 dk ses kayıtlı Note-Taking dersi ve 2 farklı akademik essay içeren orijinal BUEPT formatı.",
        price: 79.0,
        durationMins: 210,
        totalQuestions: 40,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-buept",
          code: "BUEPT",
          name: "Boğaziçi Üniversitesi BÜYES / BUEPT",
          category: "UNIVERSITY",
          scoringType: "SCORE_100",
          description: "Boğaziçi Üniversitesi Hazırlık Atlama Sınavı",
          badgeColor: "#0284c7",
        },
      },
      {
        id: "mock-odtu-1",
        examId: "exam-odtu",
        title: "2026 ODTÜ & İTÜ Seviye İYS Hazırlık Muafiyet Tam Deneme #1",
        description: "Ayırt edici Restatement soruları, Note-Taking dinleme bölümü ve akademik düşünce yazısı simülasyonu.",
        price: 69.0,
        durationMins: 165,
        totalQuestions: 60,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-odtu",
          code: "ODTU_IYS",
          name: "ODTÜ & İTÜ İngilizce Yeterlik Sınavı (İYS)",
          category: "UNIVERSITY",
          scoringType: "SCORE_100",
          description: "ODTÜ EPE ve İTÜ İYS Hazırlık Muafiyet",
          badgeColor: "#b91c1c",
        },
      },
      {
        id: "mock-prof-1",
        examId: "exam-prof",
        title: "2026 Genel Üniversite Hazırlık Atlama (Proficiency) Karma Deneme #1",
        description: "Tüm devlet ve vakıf üniversitelerinin hazırlık atlama sınavlarına uyumlu karma okuma, yazma ve dinleme denemesi.",
        price: 59.0,
        durationMins: 150,
        totalQuestions: 65,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-prof",
          code: "PROFICIENCY",
          name: "Hazırlık Atlama (Proficiency / İYS)",
          category: "UNIVERSITY",
          scoringType: "SCORE_100",
          description: "Üniversite Hazırlık Atlama Genel Formatı",
          badgeColor: "#0d9488",
        },
      },
      {
        id: "mock-bilkent-1",
        examId: "exam-bilkent",
        title: "2026 Bilkent & Koç Seviye PAE / KUEPE İngilizce Yeterlik Denemesi #1",
        description: "İleri düzey akademik okuma, ses kayıtlı speaking mülakatı ve karşılaştırmalı essay değerlendirmesi.",
        price: 89.0,
        durationMins: 180,
        totalQuestions: 55,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-bilkent",
          code: "BILKENT_PAE",
          name: "Bilkent PAE / Koç KUEPE Muafiyet",
          category: "UNIVERSITY",
          scoringType: "SCORE_100",
          description: "Vakıf Üniversiteleri Hazırlık Atlama",
          badgeColor: "#4f46e5",
        },
      },
      {
        id: "mock-ielts-1",
        examId: "exam-ielts",
        title: "2026 IELTS Academic Tam Kapsamlı 4 Beceri Simülasyonu #1",
        description: "Academic Reading, Listening, Task 1-2 Writing ve mikrofon kayıtlı Speaking modülleriyle gerçekçi Band 9.0 testi.",
        price: 129.0,
        durationMins: 165,
        totalQuestions: 40,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-ielts",
          code: "IELTS",
          name: "IELTS Academic",
          category: "INTERNATIONAL",
          scoringType: "BAND_9",
          description: "Uluslararası Üniversite ve Vize Sınavı",
          badgeColor: "#e11d48",
        },
      },
      {
        id: "mock-toefl-1",
        examId: "exam-toefl",
        title: "2026 TOEFL iBT Yeni Nesil Mikrofonlu Konuşma & Yazma Denemesi #1",
        description: "ETS standartlarında 4 bağımsız ve entegre konuşma görevi, tartışma forumu yazısı ve akademik dinleme.",
        price: 119.0,
        durationMins: 116,
        totalQuestions: 56,
        isPublished: true,
        pdfSourceUrl: null,
        createdAt: new Date(),
        exam: {
          id: "exam-toefl",
          code: "TOEFL",
          name: "TOEFL iBT",
          category: "INTERNATIONAL",
          scoringType: "SCORE_120",
          description: "ETS Entegre Dil Yeterlik Sınavı",
          badgeColor: "#8b5cf6",
        },
      },
    ];

    // Merge database mocks with university and international catalog if not present
    const existingTitles = new Set(mockExams.map((m) => m.title));
    const extraMocks = universityAndIntlMocks.filter((m) => !existingTitles.has(m.title));
    const allMockExams = [...mockExams, ...extraMocks];

    const poolQuestions = await prisma.question.findMany({
      where: { isInPool: true },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      exams,
      mockExams: allMockExams,
      poolQuestions: poolQuestions.map((q) => ({
        id: q.id,
        cefrLevel: q.cefrLevel,
        skillDomain: q.skillDomain,
        subTopic: q.subTopic,
        content: q.content,
        passage: q.passage,
        options: JSON.parse(q.optionsJson || "[]"),
        correctKey: q.correctKey,
        explanation: q.explanation || "",
      })),
    });
  } catch (error) {
    console.error("Failed to fetch mock exams:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
