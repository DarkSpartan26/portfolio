import { getAllPosts, getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Priyanshu Kapoor`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main>
      {/* Back link */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Link
          href="/blog"
          style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          className="blog-footer-link"
        >
          ← ~/blog
        </Link>
      </div>

      {/* Header */}
      <div className="fade-in" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {formatDate(post.date)}
          </span>
          <span style={{ color: 'var(--border-color)', fontFamily: 'monospace' }}>•</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {post.readTime} min read
          </span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span style={{ color: 'var(--border-color)', fontFamily: 'monospace' }}>•</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#444' }}>
                [{post.tags.join(', ')}]
              </span>
            </>
          )}
        </div>
      </div>

      {/* Thin divider */}
      <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '3rem' }} />

      {/* Post content */}
      <article
        className="prose fade-in stagger-1"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
