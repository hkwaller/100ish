import { store, autoEffect } from '@risingstack/react-easy-state'
import AsyncStorage from '@react-native-community/async-storage'

export type State = {
  isPlaying: boolean
  showQuestions: boolean
  capWrongAnswers: boolean
  game?: Game
  player?: Player
  questions: Question[]
  error: string
  isLoading: boolean
  displayGameName?: string
  selectedLanguage: string
  isTranslated: boolean
  timesPlayed: number
  hasPurchased: boolean
  hasSeenIntro: boolean
  hasAsked: boolean
  history: Game[]
}

export type Translation = {
  languageKey: string
  languageName: string
  title: string
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
  language: string
  capWrongAnswers: boolean
  newGameName: string
  sessionId: string
}

export type Question = {
  _id: string
  title: string
  answer: number
  _createdAt: string
  translations: Translation[]
}

export const state = store<State>({
  isPlaying: true,
  showQuestions: true,
  questions: [],
  error: '',
  isLoading: false,
  selectedLanguage: 'en',
  isTranslated: false,
  timesPlayed: 0,
  hasPurchased: false,
  hasSeenIntro: false,
  hasAsked: false,
  capWrongAnswers: false,
  history: [],
})

autoEffect(() => {
  if (!state.player) return
  AsyncStorage.setItem('@player', JSON.stringify(state.player))
})

autoEffect(() => {
  if (!state.game) return
  AsyncStorage.setItem('@game', JSON.stringify(state.game))
})

autoEffect(() => {
  if (state.timesPlayed === 0) return
  AsyncStorage.setItem('@timesPlayed', JSON.stringify(state.timesPlayed))
})

autoEffect(() => {
  if (state.hasPurchased === false) return
  AsyncStorage.setItem('@hasPurchased', JSON.stringify(state.hasPurchased))
})

autoEffect(() => {
  if (state.hasSeenIntro === false) return
  AsyncStorage.setItem('@hasSeenIntro', JSON.stringify(true))
})

autoEffect(() => {
  if (state.error.length > 0) {
    setTimeout(() => {
      state.error = ''
    }, 3000)
  }
})
