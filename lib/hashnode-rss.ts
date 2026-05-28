import Parser from 'rss-parser';

export type HashnodePost = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  formattedDate: string;
};

export async function getHashnodeRSSPosts(): Promise<HashnodePost[]> {
  try {
    const parser = new Parser({
      timeout: 8000,
      customFields: {
        item: ['content:encoded'],
      },
    });

    const feed = await parser.parseURL('https://priyanshukapoor.hashnode.dev/rss.xml');

    return (feed.items ?? [])
      .slice(0, 5)
      .map((item) => {
        // Strip HTML tags from snippet
        const rawSnippet =
          item.contentSnippet ??
          (item['content:encoded'] ?? '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const snippet =
          rawSnippet.length > 150
            ? rawSnippet.slice(0, 150).trimEnd() + '…'
            : rawSnippet;

        // Format date as "May 2026"
        const date = item.pubDate ? new Date(item.pubDate) : null;
        const formattedDate = date
          ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : '';

        return {
          title: item.title ?? 'Untitled',
          link: item.link ?? 'https://priyanshukapoor.hashnode.dev',
          pubDate: item.pubDate ?? '',
          contentSnippet: snippet,
          formattedDate,
        };
      });
  } catch {
    // Graceful fallback — returns empty so UI shows "No posts yet"
    return [];
  }
}
