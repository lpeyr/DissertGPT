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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${props.philo ? "/philo" : "/disserts"}/${props.id}`}
            className="w-[380px] m-2 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 rounded-md flex flex-col hover:-translate-y-2 transition overflow-hidden"
          >
            <span
              className={
                "h-16 border-b border-slate-200 dark:border-slate-700 " +
                getRandomGradient()
              }
            ></span>
            <h3 className="m-2 text-left">
              {props.subject.length > 40
                ? props.subject.substring(0, 40) + "..."
                : props.subject}
            </h3>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="max-w-[380px]">
          {props.subject}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
