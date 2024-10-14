import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serialize } from 'cookie';

export async function POST(request) {
  const { name } = await request.json();

  if (!name || name.trim() === '') {
    return NextResponse.json({ message: 'Name is required.' }, { status: 400 });
  }

  // Check if the player exists
  let player = await prisma.player.findUnique({ where: { name } });

  // If not, create a new player
  if (!player) {
    player = await prisma.player.create({
      data: { name },
    });
  } else {
    console.log('Player exists!')
  }

  const token = `${player.id}:${player.name}`;

  // Set a simple cookie
  const cookie = serialize('auth', token, {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  // Return the player data and set the cookie
  return NextResponse.json(player, {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    },
  });
}
