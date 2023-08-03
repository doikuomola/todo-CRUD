import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    revalidatePath('/crud');

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Post Error',
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      {
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Get Post fetch Error',
        error,
      },
      { status: 500 }
    );
  }
}
