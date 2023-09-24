import Head from "next/head"
import Link from "next/link"
import { Book, Lightbulb } from "lucide-react"

import { Layout } from "@/components/layout"

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
        className="m-2 flex flex-col items-center justify-center"
      >
        <div className="m-2 flex flex-col items-center">
          <h2 className="text-center text-4xl font-bold">
            Bienvenue sur DissertGPT
          </h2>
          <p>Quelle discipline voulez-vous choisir ?</p>
        </div>
        <div className="flex flex-wrap justify-center">
          <Link
            href={"/fr"}
            className="m-2 flex max-w-[300px] flex-col items-center rounded-lg border border-slate-200 shadow-md transition hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-200 dark:border-slate-800 hover:dark:shadow-blue-600/[.33]"
          >
            <Book size={48} className="my-2 h-32" />
            <span className="border-t border-slate-200 p-2 dark:border-slate-800">
              <h3>Français</h3>
              <p>Créer des dissertations type bac de français.</p>
            </span>
          </Link>
          <Link
            href={"/ph"}
            className="m-2 flex max-w-[300px] flex-col items-center rounded-lg border border-slate-200 shadow-md transition hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-200 dark:border-slate-800 hover:dark:shadow-purple-600/[.33]"
          >
            <Lightbulb size={48} className="my-2 h-32" />
            <span className="border-t border-slate-200 p-2 dark:border-slate-800">
              <h3 className="flex items-center">
                Philosophie{" "}
                <span className="mx-1 rounded-full bg-purple-600 px-2 py-[0.7px] text-xs text-white">
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
