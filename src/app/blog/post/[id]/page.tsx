import { fetchPostById } from '@/app/lib/data';
import Post from '@/app/ui/components/posts/Post';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <Post 
        id={post.id}
        title={post.title}
        content={post.content}
        date={post.date}
      />
    </>
  );
}