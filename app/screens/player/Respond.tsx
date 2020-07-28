import React, { useState } from 'react'
import { View } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import BottomButton from './components/BottomButton'
import { submitAnswers } from 'app/config/api'
import { state, Question as QuestionType } from 'app/config/store'
import Question from './components/Question'

function Respond() {
  const [answers, setAnswers] = useState(
    (state.game?.questions || []).map(_ => 0)
  )

  const navigation = useNavigation()

  return (
    <>
      <Screen title="Respond">
        <View style={{ marginVertical: 20 }} />
        {state.game?.questions.map((q: QuestionType, index: number) => {
          return (
            <Question
              key={index}
              number={index + 1}
              title={q.title}
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
        title="Submit answers"
        onPress={() => {
          submitAnswers(answers)
          navigation.navigate('Results')
        }}
      />
    </>
  )
}

export default view(Respond)
