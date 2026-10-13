import { SITE } from "@/consts"
import { getCollection, type CollectionEntry } from "astro:content"

type Post = CollectionEntry<"posts">

const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === "true"

export const pageTitle = (title: string) => `${title} | ${SITE.title}`

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
}

const decodeEntities = (text: string) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? match
    const point =
      code[1].toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10)
    return String.fromCodePoint(point)
  })

export function getDescription(post: Post, maxLength = 160): string {
  if (post.data.description) return post.data.description

  const html = (post.rendered?.html ?? "")
    .replace(/<(pre|details|table|figure)[\s\S]*?<\/\1>/g, "")
    .replace(/<h[1-6][\s\S]*?<\/h[1-6]>/g, "")

  for (const [, paragraph] of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = decodeEntities(paragraph.replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim()
    if (!text) continue
    if (text.length <= maxLength) return text
    const cut = text.slice(0, maxLength)
    const space = cut.lastIndexOf(" ")
    return `${(space > maxLength * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`
  }
  return ""
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "posts",
    ({ data }) => showDrafts || !data.draft,
  )
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getSeries(posts: Post[], series: string): Post[] {
  return posts
    .filter((post) => post.data.series === series)
    .sort(
      (a, b) =>
        (a.data.seriesOrder ?? Infinity) - (b.data.seriesOrder ?? Infinity) ||
        a.data.date.getTime() - b.data.date.getTime(),
    )
}

export async function getTags(): Promise<Map<string, Post[]>> {
  const posts = await getPosts()
  const tags = new Map<string, Post[]>()
  for (const post of posts) {
    for (const tag of new Set(post.data.tags ?? [])) {
      const tagged = tags.get(tag)
      if (tagged) tagged.push(post)
      else tags.set(tag, [post])
    }
  }
  return new Map(
    [...tags].sort(
      ([a, postsA], [b, postsB]) =>
        postsB.length - postsA.length || a.localeCompare(b),
    ),
  )
}
