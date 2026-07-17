import { z, defineCollection } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kind: z.string(),
    year: z.string().optional(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    description: z.string(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    category: z.enum(["ai", "saas", "open-source"]).optional(),
    order: z.number().default(0),
  }),
});

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    description: z.string(),
  }),
});

export const collections = { work, writing };
