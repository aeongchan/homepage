import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro/zod"

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
      tags: z.array(z.string()).optional(),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
})

const showcase = (base: string) =>
  defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base }),
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        description: z.string(),
        link: z.url(),
        tags: z.array(z.string()).optional(),
        image: image().optional(),
      }),
  })

const projects = showcase("./src/content/projects")
const skins = showcase("./src/content/skins")

export const collections = { posts, projects, skins }
