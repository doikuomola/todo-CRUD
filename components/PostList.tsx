import React from 'react';
import { PostComponent } from '.';
import { Post } from '@prisma/client';

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post, i) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
