import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch a specific post by ID
      const post = await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1;`;
      if (post.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post: post[0] }, { status: 200 });
    }

    // Fetch all posts if no ID is provided
    const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, content, date, author } = await request.json(); // Parse JSON body

    // SQL query to insert a new post with author from form
    const posts = await sql`
      INSERT INTO posts (id, title, content, date, author)
      VALUES (${id}, ${title}, ${content}, ${date}, ${author || 'Anonymous'})
      RETURNING *;
    `;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error inserting post:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

