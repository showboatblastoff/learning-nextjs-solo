import { neon } from '@neondatabase/serverless';
import { Post } from './definition';
import { unstable_noStore as noStore } from 'next/cache';
import { simulateDelay } from './utils/delay';

// Create a connection to your Neon database
const sql = neon(process.env.DATABASE_URL!);

// Function to fetch all posts
export async function fetchPosts(): Promise<Post[]> {
  try {
    noStore(); // Disable caching for this function
    
    // Simulate delay for testing loading states (only in development)
    await simulateDelay(3000);
    
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
    // Add delay here too for consistent behavior during testing
    await simulateDelay(3000);
    
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