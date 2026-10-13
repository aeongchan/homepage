import { getDescription, getPosts } from "@/lib/content"
import { pngResponse, renderOg } from "@/lib/og"
import { formatDate } from "@/lib/utils"
import type { APIRoute, GetStaticPaths } from "astro"
import type { CollectionEntry } from "astro:content"

type Props = { post: CollectionEntry<"posts"> }

export const getStaticPaths = (async () => {
  const posts = (await getPosts()).filter(({ data }) => !data.image)
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }))
}) satisfies GetStaticPaths

export const GET: APIRoute<Props> = async ({ props }) => {
  const { title, date, tags } = props.post.data
  return pngResponse(
    await renderOg({
      title,
      description: getDescription(props.post),
      meta: [formatDate(date), ...(tags ?? []).map((tag) => `#${tag}`)].join(
        "  ·  ",
      ),
    }),
  )
}
