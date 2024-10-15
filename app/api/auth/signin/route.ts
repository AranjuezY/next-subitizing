import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/lib/tools';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ message: 'Name is required.' }, { status: 400 });
    }

    // Check if the player exists
    let player = await prisma.player.findUnique({ where: { name } });

    if (!player) {
      player = await prisma.player.create({
        data: { name },
      });
    } else {
      return NextResponse.json({ message: 'Player already exists.' }, { status: 409 });
    }

    const token = jwt.sign({ id: player.id, name: player.name }, SECRET_KEY);

    const cookie = serialize('auth', token, {
      path: '/'
    });

    // Return the player data and set the cookie
    return NextResponse.json(player, {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
