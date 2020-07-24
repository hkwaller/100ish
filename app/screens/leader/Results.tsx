import React from 'react'
import { Text } from 'react-native'
import Screen from 'app/components/Screen'
import { state, Player } from 'app/config/store'
import { Bold } from 'app/components'
import { view } from '@risingstack/react-easy-state'

function Results() {
  return (
    <Screen>
      <Text>Results</Text>
      <Text>
        {state.questions.reduce((acc, cur) => {
          return acc + cur.answer
        }, 0)}
      </Text>
      {state.game?.players.map((p: Player) => {
        const playerScore = p.answers.reduce((acc, cur, index) => {
          if (cur === state.questions[index].answer) return acc - 10
          else return acc + Math.abs(state.questions[index].answer - cur)
        }, 0)
        return (
          <>
            <Bold>{p.name}</Bold>
            <Bold>{playerScore}</Bold>
          </>
        )
      })}
    </Screen>
  )
}
export default view(Results)
