import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "DissertGPT",
  description:
    "Site permettant de créer des dissertations en français avec GPT-4.",
  mainNav: [
    {
      title: "Accueil",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/LeoCorpNews",
    github: "https://github.com/Leo-Peyronnet/DissertGPT",
    docs: "https://ui.shadcn.com",
  },
}
