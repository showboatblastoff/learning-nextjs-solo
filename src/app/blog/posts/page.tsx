'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/components/button';
import Post from '@/app/ui/components/posts/Post';
import { useState, useEffect } from 'react';
import { Post as PostType } from '@/app/lib/definition';

export default function Page() {
  const [posts, setPosts] = useState<PostType[]>([]); // State for posts

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await fetch('/api/posts');
      const data = await fetchedPosts.json(); // Fixed typo
      setPosts(data.posts);
    }
    fetchPosts(); // Fetch posts on component load
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <Link href="/blog/post/insert">
        <Button className="outline outline-1 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">
          New +
        </Button>
      </Link>
      {posts?.map((post: PostType) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}