import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  tags?: string[];
  excerpt?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

// Ensure the directory exists
function ensureDir() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensureDir();

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDir, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      readTime: data.readTime ?? 1,
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? '',
    } as PostMeta;
  });

  // Sort newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  ensureDir();

  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    readTime: data.readTime ?? 1,
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
    contentHtml,
  };
}
