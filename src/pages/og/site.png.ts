import { SITE } from "@/consts"
import { pngResponse, renderOg } from "@/lib/og"
import type { APIRoute } from "astro"

export const GET: APIRoute = async () =>
  pngResponse(
    await renderOg({ title: SITE.title, description: SITE.description }),
  )
