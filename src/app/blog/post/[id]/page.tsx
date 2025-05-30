"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Post from '@/app/ui/components/posts/Post';


interface PostType {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts?id=${params.id}`);
        const data = await response.json();
        setPost(data.post); // Extract the post from the response object
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    notFound(); // Trigger 404 if post is not found
  }

  return (
    <>
      <h1>{post.title}</h1>
      <Post {...post} />
    </>
  );
}