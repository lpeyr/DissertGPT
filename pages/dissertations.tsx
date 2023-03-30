import Head from "next/head"
import { Bookmark } from "lucide-react"

import { DissertInfo } from "@/lib/dis_info"
import { DissertUiItem } from "@/components/dissert_item"
import { Layout } from "@/components/layout"

export default function DissertPage() {
  let disserts: DissertInfo[] = []
  if (typeof window !== "undefined") {
    disserts = JSON.parse(localStorage.getItem("disserts") ?? "[]")
  }
  return (
    <Layout>
      <Head>
        <title>DissertGPT | Mes dissertations</title>
        <meta
          name="description"
          content="Accèdez à vos dissertations précédemment générées."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="m-2">
        <h2 className="font-bold">Mes dissertations</h2>
        <p>Accèdez à vos dissertations précédemment générées.</p>
      </section>
      <section className="m-2 p-5 flex flex-col">
        {disserts.length > 0 ? (
          disserts.map((el, index) => {
            return <DissertUiItem subject={el.subject} id={index} />
          })
        ) : (
          <>
            <div className="p-5 flex flex-col items-center justify-center w-full h-full">
              <Bookmark size={48} />
              <p className="font-bold">Rien à voir pour le moment.</p>
            </div>
          </>
        )}
      </section>
    </Layout>
  )
}
