import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    category: z.string().default('Sanduicheiras'),
    tags: z.array(z.string()).default([]),
    amazonLinks: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { posts, pages };
