import { readFile } from "node:fs/promises"
import path from "node:path"
import { SITE } from "@/consts"
import satori from "satori"
import sharp from "sharp"

const WIDTH = 1200
const HEIGHT = 630

const COLORS = {
  background: "#fcfcfc",
  foreground: "#202020",
  muted: "#646464",
}

const fontDir = path.join(
  process.cwd(),
  "node_modules/pretendard/dist/web/static/woff2",
)

const fonts = Promise.all(
  (
    [
      ["Pretendard-Regular.woff2", 400],
      ["Pretendard-Bold.woff2", 700],
    ] as const
  ).map(async ([file, weight]) => ({
    name: "Pretendard",
    data: await readFile(path.join(fontDir, file)),
    weight,
    style: "normal" as const,
  })),
)

const logo = readFile(path.join(process.cwd(), "src/assets/logo.png")).then(
  (png) => `data:image/png;base64,${png.toString("base64")}`,
)

type Style = Record<string, string | number>
type Child = Node | string | false | undefined
type Node = { type: string; props: Record<string, unknown> }

const h = (type: string, style: Style, children?: Child | Child[]): Node => ({
  type,
  props: { style, children },
})

type OgOptions = {
  title: string
  description?: string
  meta?: string
}

export async function renderOg({
  title,
  description,
  meta,
}: OgOptions): Promise<Uint8Array> {
  const titleSize = title.length > 48 ? 56 : title.length > 28 ? 68 : 80

  const tree = h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
      width: WIDTH,
      height: HEIGHT,
      padding: "72px 88px",
      backgroundColor: COLORS.background,
      color: COLORS.foreground,
      fontFamily: "Pretendard",
    },
    [
      h("div", { display: "flex", alignItems: "center", gap: 16 }, [
        {
          type: "img",
          props: { src: await logo, width: 44, height: 44 },
        },
        h("div", { fontSize: 30, fontWeight: 700 }, SITE.title),
      ]),
      h("div", { display: "flex", flexDirection: "column", gap: 24 }, [
        h(
          "div",
          {
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.2,
            lineClamp: 3,
            wordBreak: "keep-all",
          },
          title,
        ),
        description &&
          h(
            "div",
            {
              fontSize: 30,
              lineHeight: 1.4,
              color: COLORS.muted,
              lineClamp: 2,
              wordBreak: "keep-all",
            },
            description,
          ),
      ]),
      h(
        "div",
        { display: "flex", fontSize: 26, color: COLORS.muted },
        meta ?? "",
      ),
    ],
  )

  const svg = await satori(tree as never, {
    width: WIDTH,
    height: HEIGHT,
    fonts: await fonts,
  })
  return sharp(Buffer.from(svg)).png().toBuffer()
}

export const pngResponse = (png: Uint8Array) =>
  new Response(png as BodyInit, { headers: { "Content-Type": "image/png" } })
