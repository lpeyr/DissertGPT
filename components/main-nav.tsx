import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Menu } from "lucide-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "./ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="block sm:hidden" variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent position="left" size="full">
          <SheetHeader>
            <SheetTitle>DissertGPT</SheetTitle>
            <SheetDescription>
              Création de dissertations propulsées par l&apos;IA.
            </SheetDescription>
          </SheetHeader>
          <div className="my-2 flex flex-col">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    className="rounded-md p-2 font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    key={index}
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="items-center space-x-2 md:flex">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <p className="m-1 hidden items-center rounded-full border border-blue-600 bg-blue-100 px-2 py-1 text-center text-sm text-blue-900 dark:bg-blue-900 dark:text-blue-300 sm:block">
        v3.3
      </p>

      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Créer</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cyan-500 to-blue-600 p-6 text-white no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        alt="Icon"
                        height={50}
                        width={50}
                        src="/logo.png"
                      />
                      <div className="mb-2 mt-4 text-lg font-bold">
                        DissertGPT
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Création de dissertations propulsées par l&apos;IA.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/fr" title="Français">
                  Créer des dissertations type bac de français.
                </ListItem>
                <ListItem href="/ph" title="Philosophie">
                  Créer des dissertations en philosophie.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dissertations" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Mes Dissertations
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
