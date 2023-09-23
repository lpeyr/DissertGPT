import Head from "next/head"
import Link from "next/link"
import { Bookmark, Download } from "lucide-react"

import { DissertInfo, DissertList } from "@/lib/dis_info"
import { DissertUiItem } from "@/components/dissert_item"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
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
