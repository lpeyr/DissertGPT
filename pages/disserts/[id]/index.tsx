import Head from "next/head"
import { useRouter } from "next/router"
import { encode } from "gpt-token-utils"
import parse from "html-react-parser"
import { Copy, Printer } from "lucide-react"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function PostPage() {
  const router = useRouter()
  const id = (router.query.id as string) ?? 0
  function getContent() {
    if (typeof window !== "undefined") {
      return (
        <p id="contentp">
          {parse(JSON.parse(localStorage.getItem("disserts"))[id].content)}
        </p>
      )
    }
    return <p>Une erreur s&apos;est produite.</p>
  }

  function getPrice() {
    if (typeof window !== "undefined") {
      let e = encode(JSON.parse(localStorage.getItem("disserts"))[id].content)
      let price = `\$${((e.length / 1000) * 0.06).toFixed(4)}`
      return price.toString()
    }
    return "$0"
  }

  function countWords() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("disserts"))[id].content.split(" ")
        .length
    }
  }

  function countChars() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("disserts"))[id].content.length
    }
  }

  function getSubject() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("disserts"))[id].subject
    }
  }

  return (
    <Layout>
      <Head>
        <title>{"DissertGPT | " + getSubject()}</title>
        <meta
          name="description"
          content="Accèdez à vos dissertations précédemment générées."
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-col items-center justify-center">
        <section
          className="m-2 p-4 shadow-lg print:shadow-none dark:bg-slate-900 rounded-md md:w-[90%] lg:w-[60%] xl:w-[50%] text-justify print:text-black"
          id="ct"
        >
          {getContent()}
          <div className="print:hidden flex justify-center space-x-2 mt-2">
            <Button className="flex space-x-2" onClick={() => window.print()}>
              <Printer />
              <p>Imprimer</p>
            </Button>
            <Button
              variant="outline"
              className="flex space-x-2"
              onClick={() =>
                navigator.clipboard.writeText(
                  document.getElementById("contentp").innerText
                )
              }
            >
              <Copy size={16} />
            </Button>
          </div>
        </section>
        <section className="flex flex-wrap items-center justify-center m-2 print:hidden">
          <div className="p-4 m-2 rounded-lg shadow-md bg-white dark:bg-slate-900 w-48">
            <h2 className="font-bold">Prix</h2>
            <p id="price" className="font-bold text-2xl">
              {getPrice()}
            </p>
          </div>
          <div className="p-4 m-2 rounded-lg shadow-md bg-white dark:bg-slate-900 w-48">
            <h2 className="font-bold">Mots</h2>
            <p className="font-bold text-2xl">{countWords()}</p>
          </div>
          <div className="p-4 m-2 rounded-lg shadow-md bg-white dark:bg-slate-900 w-48">
            <h2 className="font-bold">Caractères</h2>
            <p className="font-bold text-2xl">{countChars()}</p>
          </div>
        </section>
      </section>
    </Layout>
  )
}
