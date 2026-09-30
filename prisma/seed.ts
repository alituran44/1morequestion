import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial English exam taxonomy & demo content...");

  // 1. Create Default Users (Instructor & Student)
  const instructor = await prisma.user.upsert({
    where: { email: "instructor@1morequestion.com" },
    update: {},
    create: {
      email: "instructor@1morequestion.com",
      name: "Ahmet Hoca (ELT Master)",
      role: "INSTRUCTOR",
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@1morequestion.com" },
    update: {},
    create: {
      email: "student@1morequestion.com",
      name: "Deniz Yılmaz",
      role: "STUDENT",
    },
  });

  // 2. Create Exams Taxonomy
  const exams = [
    {
      code: "YDT",
      name: "YDT (YKS-Dil)",
      category: "NATIONAL",
      scoringType: "RAW_NET",
      description: "ÖSYM Yükseköğretim Kurumları Yabancı Dil Testi (80 Soru, 120 Dk).",
      badgeColor: "#3b82f6",
    },
    {
      code: "YDS",
      name: "YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı)",
      category: "NATIONAL",
      scoringType: "PERCENTAGE",
      description: "ÖSYM Akademik ve Kamu Dil Yeterlilik Sınavı (80 Soru, 180 Dk).",
      badgeColor: "#8b5cf6",
    },
    {
      code: "YOKDIL",
      name: "YÖKDİL (Sosyal / Fen / Sağlık)",
      category: "NATIONAL",
      scoringType: "PERCENTAGE",
      description: "YÖK Alan Odaklı Yabancı Dil Sınavı.",
      badgeColor: "#06b6d4",
    },
    {
      code: "IELTS_ACAD",
      name: "IELTS Academic",
      category: "INTERNATIONAL",
      scoringType: "BAND_9",
      description: "Uluslararası Üniversite ve Vize Yeterlilik Sınavı (Band 0.0 - 9.0).",
      badgeColor: "#ef4444",
    },
    {
      code: "TOEFL_IBT",
      name: "TOEFL iBT",
      category: "INTERNATIONAL",
      scoringType: "TOEFL_120",
      description: "ETS Entegre Dört Beceri Sınavı (0 - 120 Puan).",
      badgeColor: "#f59e0b",
    },
    {
      code: "DET",
      name: "Duolingo English Test",
      category: "INTERNATIONAL",
      scoringType: "DET_160",
      description: "Hızlı, Adaptif ve Bilgisayar Tabanlı Sertifika Sınavı (10 - 160).",
      badgeColor: "#10b981",
    },
    {
      code: "PROFICIENCY",
      name: "Üniversite Hazırlık Atlama (Proficiency / İYS)",
      category: "UNIVERSITY",
      scoringType: "SCORE_100",
      description: "Devlet ve Vakıf Üniversiteleri Hazırlık Muafiyet Sınavı.",
      badgeColor: "#0d9488",
    },
    {
      code: "BUEPT",
      name: "Boğaziçi Üniversitesi BUEPT / BÜYES",
      category: "UNIVERSITY",
      scoringType: "SCORE_100",
      description: "Search Reading, Note-Taking ve 2 Essay Yeterlik Sınavı.",
      badgeColor: "#0284c7",
    },
    {
      code: "ODTU_IYS",
      name: "ODTÜ & İTÜ İngilizce Yeterlik Sınavı (İYS / EPE)",
      category: "UNIVERSITY",
      scoringType: "SCORE_100",
      description: "Language Use, Note-Taking ve Akademik Essay Yeterlik Sınavı.",
      badgeColor: "#b91c1c",
    },
    {
      code: "BILKENT_PAE",
      name: "Bilkent PAE / Koç KUEPE / Sabancı ELAE",
      category: "UNIVERSITY",
      scoringType: "SCORE_100",
      description: "Vakıf Üniversiteleri 2 Aşamalı Hazırlık Atlama ve Mülakat Sınavı.",
      badgeColor: "#4f46e5",
    },
  ];

  for (const ex of exams) {
    await prisma.exam.upsert({
      where: { code: ex.code },
      update: ex,
      create: ex,
    });
  }

  const ydtExam = await prisma.exam.findUnique({ where: { code: "YDT" } });
  const ydsExam = await prisma.exam.findUnique({ where: { code: "YDS" } });
  const ieltsExam = await prisma.exam.findUnique({ where: { code: "IELTS_ACAD" } });

  // 3. Demo Mock Exams
  if (ydtExam) {
    const mock1 = await prisma.mockExam.create({
      data: {
        examId: ydtExam.id,
        title: "2026 YDT Şampiyonlar Özgün Deneme #1",
        description: "Son 5 yılın ÖSYM soru formatına birebir uyumlu, optik form ve süre simülasyonlu tam deneme.",
        price: 69.0,
        durationMins: 120,
        totalQuestions: 80,
        isPublished: true,
      },
    });

    // Add Section & sample questions
    const sec1 = await prisma.mockSection.create({
      data: {
        mockExamId: mock1.id,
        title: "Section 1: Vocabulary & Grammar (Sorular 1-15)",
        orderIndex: 1,
      },
    });

    await prisma.question.create({
      data: {
        examId: ydtExam.id,
        sectionId: sec1.id,
        cefrLevel: "B2",
        skillDomain: "Grammar",
        subTopic: "Conditionals",
        difficulty: 0.4,
        content: "If the government ______ stricter regulations earlier, the environmental crisis could have been mitigated significantly.",
        optionsJson: JSON.stringify([
          { key: "A", text: "had implemented" },
          { key: "B", text: "implements" },
          { key: "C", text: "would implement" },
          { key: "D", text: "has implemented" },
          { key: "E", text: "were to implement" },
        ]),
        correctKey: "A",
        explanation: "Geçmişte gerçekleşmemiş bir durumun sonucunu bildiren Type 3 Conditional yapısında temel cümle 'could have been mitigated' olduğundan koşul cümlesi 'Past Perfect (had implemented)' olmalıdır.",
        isInPool: true,
      },
    });
  }

  if (ydsExam) {
    const ydsMock = await prisma.mockExam.create({
      data: {
        examId: ydsExam.id,
        title: "2026 YDS Master Plus Akademik Deneme #1",
        description: "Akademik makale alıntıları, çeldiricisi yüksek cümle tamamlama ve çeviri soruları.",
        price: 89.0,
        durationMins: 180,
        totalQuestions: 80,
        isPublished: true,
      },
    });

    const secYds = await prisma.mockSection.create({
      data: {
        mockExamId: ydsMock.id,
        title: "Section 1: Phrasal Verbs & Prepositions",
        orderIndex: 1,
      },
    });

    await prisma.question.create({
      data: {
        examId: ydsExam.id,
        sectionId: secYds.id,
        cefrLevel: "C1",
        skillDomain: "Vocabulary",
        subTopic: "Phrasal_Verbs",
        difficulty: 0.8,
        content: "Scientists are trying to ______ the underlying factors that trigger sudden neurological degradation in patients.",
        optionsJson: JSON.stringify([
          { key: "A", text: "figure out" },
          { key: "B", text: "look down on" },
          { key: "C", text: "put up with" },
          { key: "D", text: "run out of" },
          { key: "E", text: "make do with" },
        ]),
        correctKey: "A",
        explanation: "'Figure out' (anlamak, çözmek, ortaya çıkarmak) anlamına gelir ve cümlenin bağlamına tam oturur.",
        isInPool: true,
      },
    });
  }

  // 4. Standalone Adaptive Question Pool (For "1 Soru Daha" feature)
  await prisma.question.createMany({
    data: [
      {
        examId: ydtExam?.id,
        cefrLevel: "B1",
        skillDomain: "Vocabulary",
        subTopic: "Collocations",
        difficulty: -0.2,
        content: "She made a significant ______ to the research project by analyzing all the collected historical archives.",
        optionsJson: JSON.stringify([
          { key: "A", text: "contribution" },
          { key: "B", text: "complaint" },
          { key: "C", text: "hesitation" },
          { key: "D", text: "destruction" },
          { key: "E", text: "precaution" },
        ]),
        correctKey: "A",
        explanation: "'Make a contribution to' (bir şeye katkıda bulunmak) sık kullanılan sabit bir kalıptır.",
        isInPool: true,
      },
      {
        examId: ieltsExam?.id,
        cefrLevel: "C1",
        skillDomain: "Reading",
        subTopic: "Inference",
        difficulty: 1.1,
        passage: "While renewable energy sources have gained remarkable momentum across developing economies, grid modernization remains an elusive goal due to prohibitive infrastructure costs.",
        content: "According to the passage, what is the primary bottleneck preventing the full integration of renewables?",
        optionsJson: JSON.stringify([
          { key: "A", text: "Lack of public interest in sustainability" },
          { key: "B", text: "Exorbitant financial expenditures needed for grid infrastructure" },
          { key: "C", text: "Inadequate generation of solar and wind power" },
          { key: "D", text: "Geopolitical restrictions on technology export" },
        ]),
        correctKey: "B",
        explanation: "'Prohibitive infrastructure costs' ifadesi doğrudan 'Exorbitant financial expenditures' (fahiş maliyetler) seçeneğiyle eş anlamlıdır.",
        isInPool: true,
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
