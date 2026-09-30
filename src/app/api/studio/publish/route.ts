import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, examCode, price, durationMins, questions } = body;

    if (!title || !examCode || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: "Eksik parametre gönderildi." },
        { status: 400 }
      );
    }

    // Find exam
    let exam = await prisma.exam.findUnique({
      where: { code: examCode },
    });

    if (!exam) {
      exam = await prisma.exam.findFirst();
    }

    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Sınav kategorisi bulunamadı." },
        { status: 404 }
      );
    }

    // Create MockExam
    const mockExam = await prisma.mockExam.create({
      data: {
        examId: exam.id,
        title,
        description: `${exam.name} için AI Deneme Stüdyosu'nda üretilen özgün soru seti.`,
        price: Number(price) || 0,
        durationMins: Number(durationMins) || 120,
        totalQuestions: questions.length,
        isPublished: true,
      },
    });

    // Create Section
    const section = await prisma.mockSection.create({
      data: {
        mockExamId: mockExam.id,
        title: "Section 1: AI Çıkarılan Sorular",
        orderIndex: 1,
      },
    });

    // Create Questions & put them in the adaptive pool
    for (const q of questions) {
      await prisma.question.create({
        data: {
          examId: exam.id,
          sectionId: section.id,
          cefrLevel: q.cefrLevel || "B2",
          skillDomain: q.skillDomain || "Grammar",
          subTopic: q.subTopic || "General",
          difficulty: Number(q.difficulty) || 0.0,
          content: q.content,
          passage: q.passage || null,
          optionsJson: JSON.stringify(q.options),
          correctKey: q.correctKey || "A",
          explanation: q.explanation || "Çözüm açıklaması hazırlandı.",
          isInPool: true, // Distributed to '1 Soru Daha' adaptive pool!
        },
      });
    }

    // Generate random 6-digit PIN code for Quizizz-style sharing
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();

    return NextResponse.json({
      success: true,
      mockId: mockExam.id,
      pinCode: randomPin,
      totalQuestions: questions.length,
    });
  } catch (error) {
    console.error("Studio publish error:", error);
    return NextResponse.json(
      { success: false, error: "Yayınlama sırasında hata oluştu." },
      { status: 500 }
    );
  }
}
