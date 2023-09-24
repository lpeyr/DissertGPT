import Head from "next/head"
import { encode } from "gpt-token-utils"
import {
  AlertTriangle,
  ArrowRight,
  Copy,
  Lightbulb,
  Loader2,
  Pencil,
  Zap,
} from "lucide-react"
import OpenAI from "openai"

import { ContentType, DissertInfo } from "@/lib/dis_info"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
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
  let model = "gpt-4"
  let task =
    'Rédige la problématisation du sujet avec trois paragraphes MAX contenu deux phrases MAX, le premier commence impérativement par "d\'une part", le second par "d\'autre part" et le troisième par "donc". Structure: 1er paragraphe : première réponse [R1] argumentée à partir de l\'analyse des notions du sujet. 2e paragraphe : questionnement de la première réponse. 3e paragraphe : reprise synthétique [S] du problème avec une question qui formule clairement l\'alternative fondamentale : "R1 ou bienR2 ?". Mettre en gras les idées.'
  let disserts: DissertInfo[] = []
  let type: ContentType = "ph_prob"
  let k = ""
  let isSuper = true
  if (typeof window !== "undefined") {
    k = localStorage.getItem("key")
    disserts = JSON.parse(localStorage.getItem("disserts_ph") ?? "[]")
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
    document.getElementById("wait").classList.remove("hidden")
    const openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true,
    })
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert qui fait des dissertations type bac de philosophie. Tes réponses sont écrites et mises en forme en HTML",
          },
          {
            role: "user",
            content: task + '"' + subject + '"',
          },
        ],
      })
      let res = completion.choices[0].message.content
      disserts.push({ subject: subject, content: res, type: type })
      document.getElementById("response").innerHTML = res
      ;(document.getElementById("send") as HTMLButtonElement).disabled = false
      document.getElementById("wait").classList.remove("hidden")
      document.getElementById("wait").classList.add("hidden")
      localStorage.setItem("disserts_ph", JSON.stringify(disserts))

      let e = encode(res)
      let price = 0
      if (model === "gpt-4") {
        price = (e.length / 1000) * 0.06
      } //gpt-3.5-turbo
      else {
        price = (e.length / 1000) * 0.002
      }
      document.getElementById("price").innerHTML = `$${price
        .toFixed(4)
        .toString()}`
    } catch (error) {
      alert("An error occured:\n" + error)
      document.getElementById("wait").classList.add("hidden")
      ;(document.getElementById("send") as HTMLButtonElement).disabled = false
    }
  }

  function sendDis() {
    sendSubject()
  }

  function copy() {
    navigator.clipboard.writeText(document.getElementById("response").innerText)
  }

  function changeModel(v) {
    model = v
  }

  function changeGoal(v) {
    switch (v) {
      case "intro":
        task =
          "Rédige l'introduction de dissertation du sujet avec accroche, définition provisoire et RAPIDE des termes principaux, problématique avec trois paragraphes (D'une part..., d'autre part..., donc...), enjeux (expliquant pourquoi on répond à cette question), annonce du plan (soit Nature, Existence, Valeur OU Sens 1, sens 2, sens 3)."
        type = "ph_intro"
        break
      default:
        task =
          'Rédige la problématisation du sujet avec trois paragraphes MAX contenu deux phrases MAX, le premier commence impérativement par "d\'une part", le second par "d\'autre part" et le troisième par "donc". Structure: 1er paragraphe : première réponse [R1] argumentée à partir de l\'analyse des notions du sujet. 2e paragraphe : questionnement de la première réponse. 3e paragraphe : reprise synthétique [S] du problème avec une question qui formule clairement l\'alternative fondamentale : "R1 ou bienR2 ?". Mettre en gras les idées.'
        type = "ph_prob"
        break
    }
  }
  return (
    <Layout>
      <Head>
        <title>DissertGPT | Philosophie</title>
        <meta
          name="description"
          content="Créez des dissertations en philosophie avec GPT-4."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="m-2">
        <h1>Philosophie</h1>
        <p>Créez des dissertations type bac de philo avec GPT-4.</p>
      </section>
      <Separator className="my-4" />
      <section className="m-2">
        <h2 className="font-bold">Informations</h2>
        <p>Entrez les informations concernant votre sujet.</p>
      </section>
      <section id="infos" className="flex flex-col items-center space-y-2 m-2">
        <div className="w-full flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
          <Input
            id="pwr"
            type="password"
            placeholder="Clé d'API OpenAI"
            defaultValue={k}
          />
          <Select onValueChange={changeModel} defaultValue="gpt-4">
            <SelectTrigger className="sm:w-[150px] min-w-[130px]">
              <SelectValue placeholder="Modèle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modèle</SelectLabel>
                <SelectItem value="gpt-4">
                  <div className="flex space-x-1 items-center">
                    <Zap size={16} />
                    <p>GPT-4</p>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-3.5-turbo">
                  <div className="flex space-x-1 items-center">
                    <Lightbulb size={16} />
                    <p>GPT-3.5</p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={changeGoal} defaultValue="prob">
            <SelectTrigger className="sm:w-[240px] min-w-[240px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mode</SelectLabel>
                <SelectItem className="flex space-x-1" value="prob">
                  <div className="flex space-x-1 items-center">
                    <Lightbulb size={16} />
                    <p>Problématisation</p>
                  </div>
                </SelectItem>
                <SelectItem className="flex space-x-1" value="intro">
                  <div className="flex space-x-1 items-center">
                    <Pencil size={16} />
                    <p>Introduction</p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          id="subject"
          placeholder="Entrez votre sujet de dissertation ici"
        />

        <div className="space-x-2">
          <Button id="send" onClick={sendDis}>
            <ArrowRight className="mr-2" size={16} />
            Envoyer le sujet
          </Button>
          <Button variant="outline" id="send" onClick={copy}>
            <Copy className="mr-2" size={16} />
            Copier le résultat
          </Button>
        </div>
      </section>
      <Separator className="my-4" />
      <section className="m-2">
        <div className="flex space-x-2 items-center">
          <h2 className="font-bold">Résultat</h2>
          <p
            id="price"
            className="px-2 rounded-full bg-green-200 dark:bg-green-950 text-green-800 dark:text-green-400 dark:border-green-400 border-green-800 border"
          >
            $0
          </p>
        </div>
        <p>
          Votre dissertation s&apos;affichera ici. Le processus peut prendre du
          temps.
        </p>
        <div className="flex flex-col md:flex-row items-center space-x-2 p-2 m-2 rounded-md dark:bg-orange-950 bg-orange-100 border border-orange-800 dark:border-orange-200 text-orange-800 dark:text-orange-200">
          <AlertTriangle className="mr-2" size={20} />
          La technologie de l&apos;IA est encore expérimentale et peut produire
          des erreurs. Il convient de l&apos;utiliser avec un jugement humain.
        </div>
      </section>
      <section id="wait" className="hidden">
        <div className="flex flex-col justify-center items-center">
          <Loader2 className="animate-spin" size={96} />
          <h3>Contenu en cours de génération</h3>
        </div>
      </section>
      <section className="m-2" id="response"></section>
    </Layout>
  )
}
