import Link from "next/link"

import { DissertItem } from "@/lib/dis_info"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export function DissertUiItem(props: DissertItem) {
  function getRandomGradient() {
    const gradients = [
      "bg-gradient-to-r from-yellow-400 to-pink-500",
      "bg-gradient-to-r from-green-400 to-blue-500",
      "bg-gradient-to-r from-purple-400 to-red-500",
      "bg-gradient-to-r from-pink-400 to-blue-500",
      "bg-gradient-to-r from-indigo-500 to-purple-600",
      "bg-gradient-to-r from-pink-500 to-indigo-600",
      "bg-gradient-to-r from-red-500 to-yellow-500",
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  function getLabel() {
    if (!props.philo) return ""
    switch (props.type) {
      case "ph_prob":
        return "Problématique"
      case "ph_intro":
        return "Introduction"
      default:
        return "Problématique"
    }
  }

  const label = getLabel()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${props.philo ? "/philo" : "/disserts"}/${props.id}`}
            className="m-2 flex w-[380px] flex-col overflow-hidden rounded-md border border-slate-200 shadow-md transition hover:-translate-y-2 hover:shadow-lg dark:border-slate-700"
          >
            <span
              className={
                "h-16 border-b border-slate-200 dark:border-slate-700 " +
                getRandomGradient()
              }
            ></span>
            <span className="flex flex-col items-start">
              {label == "" ? (
                <></>
              ) : (
                <span className="mx-2 mt-1 w-auto rounded-full border border-slate-500 p-1 text-sm text-slate-500 dark:border-slate-400 dark:text-slate-400">
                  {label}
                </span>
              )}
              <h3 className="m-2 text-left">
                {props.subject.length > 40
                  ? props.subject.substring(0, 40) + "..."
                  : props.subject}
              </h3>
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="max-w-[380px]">
          {props.subject}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
