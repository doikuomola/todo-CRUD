import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type PostProp = { params: { id: string } };

export async function GET(request: Request, { params: { id } }: PostProp) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post)
      return NextResponse.json(
        {
          message: 'Sorry No Post with this id found',
        },
        { status: 404 }
      );

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Get Post Error',
        error,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params: { id } }: PostProp) {
  try {
    const body = await request.json();

    const { title, description } = body;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post)
      return NextResponse.json(
        { message: 'No post found with this id!' },
        { status: 404 }
      );

    const updatePost = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(
      {
        updatePost,
        message: 'Post updated successfully',
      },
      { status: 200 }
    );
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

export async function DELETE(request: Request, { params: { id } }: PostProp) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post)
      return NextResponse.json(
        { message: 'No post found with this id!' },
        { status: 404 }
      );

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: 'post deleted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Delete Post Server Error',
        error,
      },
      { status: 500 }
    );
  }
}
