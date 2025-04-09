import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
		}),
});

const game = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/game" }),
});

const tool = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/tool" }),
});

export const collections = { blog, game,tool };
