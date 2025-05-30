export type Post = {
    id: string;
    title: string;
    content: string;
    date: string;
    user: string;  // Added the user field
  };

  export type User = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
