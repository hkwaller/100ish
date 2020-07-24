import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Slider from 'app/components/Slider'
import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import BottomButton from './components/BottomButton'
import { submitAnswers } from 'app/config/api'
import { state, Question } from 'app/config/store'
import { View } from 'react-native'

function Respond() {
  const [answers, setAnswers] = useState(
    (state.game?.questions || []).map(_ => 0)
  )
  const navigation = useNavigation()

  return (
    <>
      <Screen>
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>Input answers</Bold>
        {state.game?.questions.map((q: Question, index: number) => {
          return (
            <View key={index}>
              {state.game?.showQuestions && (
                <Bold style={{ marginBottom: 12 }}>{q.title}</Bold>
              )}
              <Slider
                number={index + 1}
                updateVal={val => {
                  const updatedAnswers = answers
                  updatedAnswers[index] = val
                  setAnswers(updatedAnswers)
                }}
              />
            </View>
          )
        })}
      </Screen>
      <BottomButton
        onPress={() => {
          submitAnswers(answers)
          navigation.navigate('Results')
        }}
        title="Submit answers"
      />
    </>
  )
}

export default view(Respond)
