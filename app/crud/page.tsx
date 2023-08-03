import { AddPost, PostList } from '@/components';
import React from 'react';

async function getPostsData() {
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'GET',
    cache: 'no-store',
  });

  const { posts } = await res.json();

  return posts;
}

export default async function Crud() {
  const posts = await getPostsData();

  return (
    <main className="mt-1 md:mt-8">
      <div className="my-2 md:my-5 flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-light md:font-bold">Todo List App</h1>
        <AddPost />
      </div>

      <PostList posts={posts} />
    </main>
  );
}
