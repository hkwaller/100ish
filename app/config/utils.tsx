import { state, Question } from './store'
import { nouns, adjectives, verbs } from 'human-id'
import {
  setPurchaseListener,
  connectAsync,
  getProductsAsync,
  IAPResponseCode,
  finishTransactionAsync,
} from 'expo-in-app-purchases'
import AsyncStorage from '@react-native-community/async-storage'

export function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getPlayerScore(answers: number[]) {
  return answers.reduce((acc, cur, index) => {
    if (cur === state.game?.questions[index].answer) return acc - 10
    else {
      const score = Math.abs((state.game?.questions[index].answer || 0) - cur)
      return (
        acc + (state.game?.capWrongAnswers ? Math.min(score, 25) : score || 0)
      )
    }
  }, 0)
}

export function shuffle(array: Question[]) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const dict = [adjectives, nouns, verbs]
export function validateGameWord(gamename: string) {
  const arr = gamename.split(' ')

  return (
    arr.length === 3 &&
    gamename
      .split(' ')
      .every(
        (word: string, index: number) =>
          dict[index].filter(dW => dW.toLowerCase() === word.toLowerCase())
            .length > 0
      )
  )
}

export function getTranslatedTitle(q: Question) {
  if (!state.isTranslated) return q.title

  switch (state.selectedLanguage) {
    case 'en':
      return q.title
    case 'sv':
      return q.translations.filter(q => q.languageKey === 'sv')[0].title
    case 'no':
      return q.translations.filter(q => q.languageKey === 'no')[0].title
    default:
      return q.title
  }
}

export async function setupPurchases() {
  const history = await connectAsync()
  if (history.responseCode === IAPResponseCode.OK) {
    history.results?.forEach(result => {
      if (result.productId === 'premium') state.hasPurchased = true
    })
  } else {
    console.log('shit failed yo')
  }
}

export async function setupPurchaseListener() {
  await getProductsAsync(['premium'])

  setPurchaseListener(({ responseCode, results, errorCode }) => {
    if (responseCode === IAPResponseCode.OK) {
      results.forEach(purchase => {
        if (!purchase.acknowledged) {
          state.hasPurchased = true
          AsyncStorage.setItem('@hasPurchased', JSON.stringify(true))
          finishTransactionAsync(purchase, false)
        }
      })
    }

    if (responseCode === IAPResponseCode.USER_CANCELED) {
      console.log('User canceled the transaction')
    } else if (responseCode === IAPResponseCode.DEFERRED) {
      console.log(
        'User does not have permissions to buy but requested parental approval (iOS only)'
      )
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`
      )
    }
  })
}
