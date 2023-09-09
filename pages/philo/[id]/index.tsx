import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { encode } from "gpt-token-utils"
import parse from "html-react-parser"

import { Layout } from "@/components/layout"

export default function PostPage() {
  const router = useRouter()
  const id = (router.query.id as string) ?? 0
  function getContent() {
    if (typeof window !== "undefined") {
      return (
        <div>
          {parse(JSON.parse(localStorage.getItem("disserts_ph"))[id].content)}
        </div>
      )
    }
    return <p>Une erreur s&apos;est produite.</p>
  }

  function getPrice() {
    if (typeof window !== "undefined") {
      let e = encode(
        JSON.parse(localStorage.getItem("disserts_ph"))[id].content
      )
      let price = `\$${((e.length / 1000) * 0.06).toFixed(4)}`
      return price.toString()
    }
    return "$0"
  }

  return (
    <Layout>
      <Head>
        <title>DissertGPT</title>
        <meta
          name="description"
          content="Accèdez à vos dissertations précédemment générées."
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex space-x-2 items-center m-2">
        <h2 className="font-bold">Prix</h2>
        <p
          id="price"
          className="px-2 rounded-full bg-green-200 dark:bg-green-950 text-green-800 dark:text-green-400 dark:border-green-400 border-green-800 border"
        >
          {getPrice()}
        </p>
      </section>
      <section className="flex justify-center">
        <section
          className="m-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-md md:w-[90%] lg:w-[60%] xl:w-[50%] text-justify"
          id="ct"
        >
          {getContent()}
        </section>
      </section>
    </Layout>
  )
}
