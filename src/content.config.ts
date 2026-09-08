import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
	schema: z.object({
		title: z.string(),
		client: z.string(),
		status: z.string(),
		summary: z.string(),
		role: z.string(),
		year: z.string(),
		tags: z.array(z.string()),
		order: z.number(),
		draft: z.boolean().default(false),
	}),
});

const playground = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/playground' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		order: z.number(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { 'case-studies': caseStudies, playground };
