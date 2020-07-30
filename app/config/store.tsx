import { store, autoEffect } from '@risingstack/react-easy-state'
import AsyncStorage from '@react-native-community/async-storage'
import { capitalise } from './utils'

export type State = {
  isPlaying: boolean
  showQuestions: boolean
  game?: Game
  player?: Player
  questions: Question[]
  error: string
  isLoading: boolean
  displayGameName?: string
}

export type Player = {
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
  isOpen: boolean
  showQuestions: boolean
}

export type Question = {
  _id: string
  title: string
  answer: number
  _createdAt: string
}

export const state = store<State>({
  isPlaying: true,
  showQuestions: false,
  questions: [],
  error: '',
  isLoading: false,
})

autoEffect(() => {
  if (!state.player) return
  AsyncStorage.setItem('@player', JSON.stringify(state.player))
})

autoEffect(() => {
  if (!state.game) return
  state.displayGameName = state.game.gamename
    .split('-')
    .map(w => capitalise(w))
    .join(' ')
})
