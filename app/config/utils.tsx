import { state, Question } from './store'
import { nouns, adjectives, verbs } from 'human-id'

export function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getPlayerScore(answers: number[]) {
  return answers.reduce((acc, cur, index) => {
    if (cur === state.game?.questions[index].answer) return acc - 10
    else return acc + Math.abs(state.game.questions[index].answer - cur)
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
