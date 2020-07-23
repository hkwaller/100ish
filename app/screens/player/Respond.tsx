import React, { useState } from 'react'
import Slider from 'app/components/Slider'
import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import { useNavigation } from '@react-navigation/native'
import BottomButton from './components/BottomButton'
import { submitAnswers } from 'app/config/api'
import { view } from '@risingstack/react-easy-state'
import { state } from 'app/config/store'

function Respond() {
  const [answers, setAnswers] = useState(
    (state.game?.questions || []).map(_ => 0)
  )
  const navigation = useNavigation()
  console.log('state.game: ', state.game)

  return (
    <>
      <Screen>
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>Input answers</Bold>
        {state.game?.questions.map((q, index) => {
          return (
            <Slider
              number={index + 1}
              updateVal={val => {
                const updatedAnswers = answers
                updatedAnswers[index] = val
                setAnswers(updatedAnswers)
              }}
            />
          )
        })}
      </Screen>
      <BottomButton
        onPress={() => {
          submitAnswers(answers)
          navigation.navigate('Finished')
        }}
        title="Submit answers"
      />
    </>
  )
}

export default view(Respond)
