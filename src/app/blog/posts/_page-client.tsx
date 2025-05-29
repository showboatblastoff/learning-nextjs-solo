'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/components/button';
import Post from '@/app/ui/components/posts/Post';
import { useState, useEffect } from 'react';
import { Post as PostType } from '@/app/lib/definition';

export default function Page() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await fetch('/api/posts');
        const data = await fetchedPosts.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    }
    fetchPosts();
  }, []);

  // Manual loading state since loading.tsx doesn't work with client components
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

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