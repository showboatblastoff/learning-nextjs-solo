import Link from 'next/link';
import { Button } from '@/app/ui/components/button';
import Post from '@/app/ui/components/posts/Post';
import { fetchPosts } from '@/app/lib/data';
import { auth } from '../../../../auth.config';

// Force dynamic rendering since we're using noStore()
export const dynamic = 'force-dynamic';

export default async function Page() {
  // This will trigger loading.tsx while data is being fetched
  const posts = await fetchPosts();
  const session = await auth();
  return (
    <>
      <h1>Posts</h1>
      {session?.user && <Link href="/blog/post/insert">
        <Button className="outline outline-1 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">
          New +
        </Button>
      </Link>}
      {posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}