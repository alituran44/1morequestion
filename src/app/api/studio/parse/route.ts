import { NextRequest, NextResponse } from "next/server";
import { parseExamContent } from "@/lib/ai-extractor";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawText = formData.get("text") as string | null;
    const examCode = (formData.get("examCode") as string) || "YDT";

    let extractedText = "";

    if (file && typeof file.arrayBuffer === "function") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      try {
        const { PDFParse } = await import("pdf-parse");
        const parser = new (PDFParse as any)({ data: buffer });
        if (typeof parser.load === "function") {
          await parser.load();
        }
        if (typeof parser.getText === "function") {
          const textResult = await parser.getText();
          extractedText = typeof textResult === "string" ? textResult : textResult?.text || "";
        }
      } catch (pdfErr) {
        console.warn("PDF parse fallback:", pdfErr);
        extractedText = buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ");
      }
    } else if (rawText) {
      extractedText = rawText;
    }

    const questions = await parseExamContent(extractedText, examCode);

    return NextResponse.json({
      success: true,
      questions,
      extractedLength: extractedText.length,
      totalQuestions: questions.length,
      snippet: extractedText.slice(0, 300),
    });
  } catch (error) {
    console.error("Studio parse error:", error);
    return NextResponse.json(
      { success: false, error: "Ayrıştırma hatası oluştu." },
      { status: 500 }
    );
  }
}
