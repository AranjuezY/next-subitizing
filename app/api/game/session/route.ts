import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const decayFactor = 0.85;

  try {
    const { playerId, rounds } = await request.json();

    if (!playerId || !Array.isArray(rounds)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    let totalTimeSpent = 0;
    let totalScore = 0;

    rounds.forEach((round: any) => {
      totalTimeSpent += round.timeSpent;
    });

    const roundData = rounds.map((round: any) => {
      const roundScore = (round.dotsCount / Math.pow(round.timeSpent, decayFactor)) * (round.isCorrect ? 1 : 0.5) * 1000;
      totalScore += roundScore;

      return {
        roundNumber: round.roundNumber,
        dotsCount: round.dotsCount,
        timeSpent: round.timeSpent,
        isCorrect: round.isCorrect,
        score: roundScore,
      };
    });

    const totalRounds = rounds.length;
    totalScore *= totalTimeSpent / totalRounds;

    const gameSession = await prisma.gameSession.create({
      data: {
        playerId,
        totalScore,
        rounds: {
          create: roundData,
        },
      },
      include: { rounds: true },
    });

    return NextResponse.json(gameSession, { status: 201 });
  } catch (error) {
    console.error('Error creating game session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
