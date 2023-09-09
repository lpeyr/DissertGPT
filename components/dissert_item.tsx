import Link from "next/link"

import { DissertItem } from "@/lib/dis_info"

export function DissertUiItem(props: DissertItem) {
  return (
    <Link
      href={`/disserts/${props.id}`}
      className="w-full text-xl font-bold p-3 my-2 bg-slate-200 dark:bg-slate-900 rounded-xl"
    >
      {props.subject}
    </Link>
  )
}
