import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import parse from "html-react-parser"

import { Layout } from "@/components/layout"

export default function PostPage() {
  const router = useRouter()
  const id = (router.query.id as string) ?? 0
  function getContent() {
    if (typeof window !== "undefined") {
      return (
        <div>
          {parse(JSON.parse(localStorage.getItem("disserts"))[id].content)}
        </div>
      )
    }
    return <p>Une erreur s&apos;est produite.</p>
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
      <section className="flex justify-center">
        <section
          className="m-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-md md:w-[90%] lg:w-[60%] xl:w-[50%]"
          id="ct"
        >
          {getContent()}
        </section>
      </section>
    </Layout>
  )
}
