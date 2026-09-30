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

    const mockExams = await prisma.mockExam.findMany({
      where: { isPublished: true },
      include: {
        exam: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const poolQuestions = await prisma.question.findMany({
      where: { isInPool: true },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      exams,
      mockExams,
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
