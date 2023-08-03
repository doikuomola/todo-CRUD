import Link from 'next/link';
import React from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}

async function getUsersData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}

export default async function Posts() {
  //   const posts = await getPosts();

  const [posts, users] = await Promise.all([getPosts(), getUsersData()]);

  return (
    <div>
      <h1 className="text-4xl">Posts Page</h1>
      <h2 className="text-2xl">Users</h2>

      <div className="">
        {users.map((user: User, i: string) => (
          <p key={i}>{user.name}</p>
        ))}
      </div>

      <ul className="space-y-4 mt-10">
        {posts.map((post: Post, i: string) => (
          <li key={post.id} className="bg-neutral-200 rounded-lg p-4">
            <Link href="">
              <h4 className="font-bold text-xl">{post.title}</h4>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
