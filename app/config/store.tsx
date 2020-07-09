import { store } from '@risingstack/react-easy-state'

export type State = {
  questions: Question[]
  isPlaying: boolean
  game?: Game
}

export type Player = {
  id: string
  name: string
  answers: number[]
  isFinished: boolean
}

export type Game = {
  id: string
  players: Player
}

export type Question = {
  title: string
  answer: number
  _createdAt: string
}

export const state = store<State>({
  questions: [],
  isPlaying: false,
  game: undefined,
})
