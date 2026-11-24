import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    section: z.enum(['library', 'research']),
    category: z.string(),
    level: z.string(),
    minutes: z.number().int().positive(),
    featured: z.boolean().default(false),
    subtitle: z.string().optional(),
    author: z.string().optional(),
    reviewer: z.string().optional(),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    reviewStatus: z.string(),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() }))
  })
});

export const collections = { articles };
