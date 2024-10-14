import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topScores = await prisma.gameSession.findMany({
      select: {
        totalScore: true,
        createdAt: true,
        player: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        totalScore: 'desc'
      },
      take: 10
    });

    const formattedScores = topScores.map((session) => ({
      name: session.player.name,
      score: session.totalScore,
      date: session.createdAt.toISOString().split('T')[0]
    }));

    return NextResponse.json(formattedScores);
  } catch (error: unknown) {
    console.error("Error fetching top scores:", error);
    return NextResponse.json({ error: "Error fetching top scores." }, { status: 500 });
  }
}
