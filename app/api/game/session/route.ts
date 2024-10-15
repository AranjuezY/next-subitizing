import prisma from "@/lib/prisma";
import { calculateScore } from "@/lib/tools";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const decayFactor = 0.85;

  try {
    const { playerId, rounds } = await request.json();

    if (!playerId || !Array.isArray(rounds)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    let totalTimeSpent = 0;
    let totalScore = 0;

    rounds.forEach((round) => {
      totalTimeSpent += round.timeSpent;
    });

    const roundData = rounds.map((round) => {
      const roundScore = calculateScore(round.dotsCount, round.timeSpent, decayFactor, round.isCorrect);
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
  } catch (error: unknown) {
    console.error('Error creating game session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
