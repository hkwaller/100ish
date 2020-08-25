import React, { useState } from 'react'
import { View } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation, useRoute } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import BottomButton from './components/BottomButton'
import { submitAnswers } from 'app/config/api'
import { state, Question as QuestionType } from 'app/config/store'
import Question from './components/Question'
import { getTranslatedTitle } from 'app/config/utils'

function Respond() {
  const [answers, setAnswers] = useState(
    (state.game?.questions || []).map(_ => 0)
  )

  const route = useRoute()
  const navigation = useNavigation()

  return (
    <>
      <Screen title="Respond">
        <View style={{ marginVertical: 10 }} />
        {state.game?.questions.map((q: QuestionType, index: number) => {
          return (
            <Question
              key={index}
              number={index + 1}
              title={getTranslatedTitle(q).replace(/&quot;/g, '"')}
              defaultValue={
                route.params?.isLoadedFromCache
                  ? state.game?.players.filter(
                      p => p.name === state.player?.name
                    )[0].answers[index]
                  : undefined
              }
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
