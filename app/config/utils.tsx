import { state, Question } from './store'

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
