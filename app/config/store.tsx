import { store } from '@risingstack/react-easy-state'

export type State = {
  questions: Question[]
  isPlaying: boolean
  game?: Game
  player?: Player
}

export type Player = {
  id: string
  name: string
  answers: number[]
  isFinished: boolean
}

export type Game = {
  _id: string
  gamename: string
  players: Player[]
  questions: Question[]
  isReady: boolean
}

export type Question = {
  _id: string
  title: string
  answer: number
  _createdAt: string
}

export const state = store<State>({
  questions: [],
  isPlaying: true,
})
