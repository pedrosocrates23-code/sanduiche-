import { getCollection } from 'astro:content';

const SITE = 'https://guiadasanduicheira.com.br';

const staticPages = [
  { url: `${SITE}/`,                         priority: '1.0', changefreq: 'daily'   },
  { url: `${SITE}/fale-conosco`,             priority: '0.4', changefreq: 'yearly'  },
  { url: `${SITE}/politica-de-privacidade`,  priority: '0.3', changefreq: 'yearly'  },
  { url: `${SITE}/termos-de-uso`,            priority: '0.3', changefreq: 'yearly'  },
];

export async function GET() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const postEntries = posts.map(post => ({
    url:        `${SITE}/${post.data.slug}`,
    lastmod:    (post.data.updatedDate ?? post.data.pubDate).toISOString().split('T')[0],
    priority:   '0.8',
    changefreq: 'monthly',
  }));

  const allEntries = [
    ...staticPages.map(p => ({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
    ...postEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allEntries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
