import { neon } from '@neondatabase/serverless';
import { Post } from './definition';
import { unstable_noStore as noStore } from 'next/cache';

// Create a connection to your Neon database
const sql = neon(process.env.DATABASE_URL!);

// Configure delay for testing loading states (set to 0 to disable)
const LOADING_STATE_DELAY = 3000; // milliseconds

// Function to fetch all posts

export async function fetchPosts(): Promise<Post[]> {
  try {
    noStore(); // Disable caching for this function
    
    // Simulate delay for testing loading states
    if (LOADING_STATE_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, LOADING_STATE_DELAY));
    }
    
    const data = await sql`
      SELECT id, title, content, date, author as user
      FROM posts
    `;
    console.log('Fetched posts:', data);
    return data as Post[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

// Function to fetch a single post by ID
export async function fetchPostById(id: string): Promise<Post | undefined> {
  try {
    // Simulate delay for testing loading states (same as fetchPosts)
    if (LOADING_STATE_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, LOADING_STATE_DELAY));
    }
    
    const data = await sql`
      SELECT id, title, content, date, author as user
      FROM posts
      WHERE id = ${id}
    `;
    return data[0] as Post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}