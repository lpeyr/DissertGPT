import Head from "next/head"
import Link from "next/link"
import { Bookmark, Download, Upload } from "lucide-react"

import { DissertInfo, DissertList } from "@/lib/dis_info"
import { DissertUiItem } from "@/components/dissert_item"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DissertPage() {
  let disserts: DissertInfo[] = []
  let disserts_ph: DissertInfo[] = []
  if (typeof window !== "undefined") {
    disserts = JSON.parse(localStorage.getItem("disserts") ?? "[]")
    disserts_ph = JSON.parse(localStorage.getItem("disserts_ph") ?? "[]")
  }

  let dissert_to_export: DissertList = {
    french: disserts,
    philo: disserts_ph,
  }

  function Import(event) {
    let file = event.target.files[0] // get the selected file
    let reader = new FileReader() // create a FileReader object
    reader.onload = function (event) {
      let text: string = event.target.result as string // get the file content as text
      let json: DissertList = JSON.parse(text) // parse the text as JSON
      disserts = disserts.concat(json.french)
      disserts_ph = disserts_ph.concat(json.philo)
      localStorage.setItem("disserts", JSON.stringify(disserts))
      localStorage.setItem("disserts_ph", JSON.stringify(disserts_ph))
    }
    reader.readAsText(file) // read the file as text
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
      <Input
        type="file"
        id="FileSelector"
        accept="application/json"
        className="hidden"
        onChange={Import}
      ></Input>
      <Tabs defaultValue="fr" className="m-2">
        <TabsList>
          <TabsTrigger value="fr">Français</TabsTrigger>
          <TabsTrigger value="ph">Philosophie</TabsTrigger>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={
                    "data:text/plain;charset=UTF-8," +
                    encodeURIComponent(
                      typeof window !== "undefined"
                        ? JSON.stringify(dissert_to_export)
                        : "{msg: 'an error occurred'}"
                    )
                  }
                  download={"dissertations.json"}
                >
                  <Button variant="ghost" className="h-auto">
                    <Download size={16} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exporter vos dissertations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() =>
                    (
                      document.getElementById(
                        "FileSelector"
                      ) as HTMLInputElement
                    ).click()
                  }
                  variant="ghost"
                  className="h-auto"
                >
                  <Upload size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Importer vos dissertations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>
        <TabsContent value="fr">
          <section className="m-2 p-5 flex flex-wrap justify-center md:justify-start">
            {disserts.length > 0 ? (
              disserts.map((el, index) => {
                return (
                  <DissertUiItem
                    philo={false}
                    subject={el.subject}
                    id={index}
                  />
                )
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
        </TabsContent>
        <TabsContent value="ph">
          <section className="m-2 p-5 flex flex-wrap justify-center md:justify-start">
            {disserts_ph.length > 0 ? (
              disserts_ph.map((el, index) => {
                return (
                  <DissertUiItem
                    philo={true}
                    subject={el.subject}
                    id={index}
                    type={el.type}
                  />
                )
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
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
