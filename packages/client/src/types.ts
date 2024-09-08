// forum
export interface Message {
  id: number
  username: string
  date: string
  content: string
}

export interface Topic {
  id: number
  title: string
  messages: Message[]
}

export interface Section {
  id: number
  title: string
  topics: Topic[]
}
