const { neon } = require("@neondatabase/serverless");
const { posts } = require("../src/app/lib/placeholder-data.js");

async function seedPosts() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Create the posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `;

    console.log('Created "posts" table');

    // Insert posts
    for (const post of posts) {
      await sql`
        INSERT INTO posts (id, title, content, date, author)
        VALUES (${post.id}, ${post.title}, ${post.content}, ${post.date}, ${post.user})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log(`Seeded ${posts.length} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

seedPosts().catch((err) => {
  console.error("An error occurred while seeding the database:", err);
});
