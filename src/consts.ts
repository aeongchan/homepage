import type { SvgComponent } from "astro/types"
import GitHub from "@/assets/icons/github.svg"
import Twitter from "@/assets/icons/twitter.svg"

export const SITE = {
  title: "aeong.win",
  description: "very personal website",
  locale: "ko-KR",
  dir: "ltr",
} as const

export const NAVIGATION = [
  { href: "/posts", label: "Posts" },
  { href: "/projects", label: "Projects" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/aeongdesu", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/aeong_vrc", label: "Twitter", icon: Twitter },
]
