export interface DissertInfo {
  subject: string
  content: string
  type?: ContentType
}
export interface DissertItem {
  subject: string
  id: number
  philo: boolean
  type?: ContentType
}

export type ContentType = "ph_prob" | "ph_intro"
