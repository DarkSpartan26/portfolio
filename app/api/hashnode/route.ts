import { NextResponse } from 'next/server';

export async function GET() {
  const query = `
    query GetPublicationPosts($host: String!) {
      publication(host: $host) {
        posts(first: 10) {
          edges {
            node {
              title
              slug
              publishedAt
              readTimeInMinutes
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Origin': 'https://hashnode.com',
        'Referer': 'https://hashnode.com/',
      },
      body: JSON.stringify({
        query,
        variables: { host: 'spartan-blog.hashnode.dev' },
      }),
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Hashnode API error:', res.status, text.slice(0, 200));
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const json = await res.json();
    const posts =
      json.data?.publication?.posts?.edges?.map((edge: any) => edge.node) ?? [];

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Hashnode fetch failed:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
