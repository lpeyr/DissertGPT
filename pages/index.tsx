import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const { Configuration, OpenAIApi } = require("openai")

export default function IndexPage() {
  if (typeof window !== "undefined") {
    ;(document.getElementById("pwr") as HTMLInputElement).value =
      localStorage.getItem("key")
  }
  async function sendSubject() {
    let subject: string = (
      document.getElementById("subject") as HTMLInputElement
    ).value
    let key: string = (document.getElementById("pwr") as HTMLInputElement).value

    if (key === "") {
      alert("Spécifiez un clé d&apos;API OpenAI")
      return
    }

    localStorage.setItem("key", key)

    if (subject === "") {
      alert("Spécifiez un sujet !")
      return
    }
    ;(document.getElementById("send") as HTMLButtonElement).disabled = true

    const configuration = new Configuration({
      apiKey: key,
    })
    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant qui fait des dissertations type bac de français. Tes réponses sont écrites et mises en forme en HTML",
        },
        {
          role: "user",
          content:
            "Rédige l&apos;introduction (amorce, présentation du sujet, problématique et annonce du plan), le contenu de la dissertation, et la conclusion du sujet suivant : " +
            subject,
        },
      ],
    })
    let res = completion.data.choices[0].message.content
    document.getElementById("response").innerHTML = res
    ;(document.getElementById("send") as HTMLButtonElement).disabled = false
  }

  function copy() {
    navigator.clipboard.writeText(document.getElementById("response").innerText)
  }
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
      <section className="m-2">
        <h2 className="font-bold">Informations</h2>
        <p>Entrez les informations concernant votre sujet.</p>
      </section>
      <section id="infos" className="flex flex-col items-center space-y-2 m-2">
        <Input id="pwr" type="password" placeholder="Clé d'API OpenAI" />
        <Textarea
          id="subject"
          placeholder="Entrez votre sujet de dissertation ici"
        />
        <div className="space-x-2">
          <Button id="send" onClick={sendSubject}>
            Envoyer le sujet
          </Button>
          <Button variant="outline" id="send" onClick={copy}>
            Copier le résultat
          </Button>
        </div>
      </section>
      <Separator className="my-4" />
      <section className="m-2">
        <h2 className="font-bold">Résultat</h2>
        <p>
          Votre dissertation s&apos;affichera ici. Le processus peut prendre du
          temps.
        </p>
      </section>
      <section className="m-2" id="response"></section>
    </Layout>
  )
}
