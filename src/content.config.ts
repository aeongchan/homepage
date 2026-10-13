import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { slug } from "github-slugger"

const postId = ({
  entry,
  data,
}: {
  entry: string
  data: Record<string, unknown>
}) => {
  if (typeof data.uuid === "string" && data.uuid) {
    return `n${data.uuid.replaceAll("-", "").slice(0, 12).toLowerCase()}`
  }
  if (data.slug) return String(data.slug)
  return entry
    .replace(/\.[^./]+$/, "")
    .split("/")
    .map((segment) => slug(segment))
    .join("/")
    .replace(/\/index$/, "")
}

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/blog",
    generateId: postId,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      uuid: z.uuid().optional(),
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

export const collections = { blog, projects, skins }
