import type { IconMap, SocialLink, Site } from "@/types"

export const SITE: Site = {
  title: "aeong.win",
  description: "tsundere save the world",
  href: "https://aeong.win",
  author: "aeong",
  locale: "ko",
  featuredPostCount: 2,
  postsPerPage: 3
}

export const NAV_LINKS: SocialLink[] = [
  { href: "/posts", label: "blog" },
  { href: "/skins", label: "skins" },
  { href: "/about", label: "about" }
]

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/aeongdesu", label: "GitHub" },
  { href: "https://discord.com/users/548821619661864962", label: "Discord" },
  { href: "https://twitch.tv/aeongdesu", label: "Twitch" },
  { href: "https://twitter.com/HDDTHR", label: "Twitter" },
  { href: "/rss.xml", label: "RSS" }
]

export const ICON_MAP: IconMap = {
  GitHub: "lucide:github",
  Discord: "qlementine-icons:discord-16",
  Twitch: "lucide:twitch",
  Twitter: "lucide:twitter",
  RSS: "lucide:rss"
}
