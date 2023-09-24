import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { encode } from "gpt-token-utils"
import {
  AlertTriangle,
  ArrowRight,
  Book,
  Copy,
  FileText,
  Lightbulb,
  ListStart,
  Loader2,
  Pencil,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { DissertInfo } from "@/lib/dis_info"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>DissertGPT</title>
        <meta
          name="description"
          content="Créez des dissertations en français avec GPT-4."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        style={{ minHeight: "calc(100vh - 74px)" }}
        className="m-2 flex flex-col justify-center items-center"
      >
        <div className="m-2 flex flex-col items-center">
          <h2 className="font-bold text-4xl text-center">
            Bienvenue sur DissertGPT
          </h2>
          <p>Quelle discipline voulez-vous choisir ?</p>
        </div>
        <div className="flex flex-wrap justify-center">
          <Link
            href={"/fr"}
            className="border max-w-[300px] border-slate-200 dark:border-slate-800 m-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-200 hover:dark:shadow-blue-600/[.33] hover:-translate-y-2 transition flex flex-col items-center"
          >
            <Book size={48} className="my-2 h-32" />
            <span className="border-t border-slate-200 dark:border-slate-800 p-2">
              <h3>Français</h3>
              <p>Créer des dissertations type bac de français.</p>
            </span>
          </Link>
          <Link
            href={"/ph"}
            className="border max-w-[300px] border-slate-200 dark:border-slate-800 m-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-200 hover:dark:shadow-purple-600/[.33] hover:-translate-y-2 transition flex flex-col items-center"
          >
            <Lightbulb size={48} className="my-2 h-32" />
            <span className="border-t border-slate-200 dark:border-slate-800 p-2">
              <h3 className="flex items-center">
                Philosophie{" "}
                <span className="text-xs rounded-full text-white bg-purple-600 mx-1 px-2 py-[0.7px]">
                  Beta
                </span>
              </h3>
              <p>Créer des dissertations en philosophie.</p>
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
