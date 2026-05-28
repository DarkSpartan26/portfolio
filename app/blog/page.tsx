import { getHashnodeRSSPosts, type HashnodePost } from '@/lib/hashnode-rss';

export const metadata = {
  title: 'Blog | Priyanshu Kapoor',
  description: 'Thoughts on Linux, homelab, devops, and the internet.',
};

// ISR – rebuild this page at most every 24 hours
export const revalidate = 86400;

export default async function Blog() {
  const hashPosts = await getHashnodeRSSPosts();

  return (
    <main>
      <h1 className="fade-in" style={{ marginBottom: '0.5rem' }}>blog</h1>
      <p className="fade-in stagger-1" style={{ marginBottom: '3rem' }}>
        Thoughts on Linux, homelab, devops, and the internet.
      </p>

      {/* ── Hashnode Recent Posts ────────────────────────── */}
      <div className="slide-up stagger-2">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Recent Posts
          </h2>
          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#333' }}>
            via Hashnode
          </span>
        </div>

        {hashPosts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {hashPosts.map((post: HashnodePost) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hashnode-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span className="hashnode-card-title">{post.title}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {post.formattedDate}
                  </span>
                </div>
                {post.contentSnippet && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    {post.contentSnippet}
                  </p>
                )}
                <span className="hashnode-card-link">Read on Hashnode →</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
