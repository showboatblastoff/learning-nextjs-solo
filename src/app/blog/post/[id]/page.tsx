"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Post from '@/app/ui/components/posts/Post';

interface PostType {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
}

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log('Fetching post with ID:', id);
        const response = await fetch(`/api/posts?id=${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response:', data); // Debug log
        
        if (data.post) {
          setPost(data.post); // Extract the post from the response object
        } else {
          console.error('No post in response:', data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>{post.title}</h1>
      <Post {...post} />
    </>
  );
}