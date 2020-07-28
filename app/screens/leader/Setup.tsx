import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'
import humanId from 'human-id'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import BottomButton from '../player/components/BottomButton'
import { createGame } from 'app/config/api'
import { PageHeader } from 'app/components'
import { state } from 'app/config/store'
import AnimatedCheckbox from './components/AnimatedCheckbox'

function Setup() {
  const navigation = useNavigation()
  const [questions, setQuestions] = useState(5)

  function updateQuestions(val: number) {
    setQuestions(val)
  }

  return (
    <>
      <Screen title="Setup">
        <Slider
          header="Questions"
          max={10}
          updateVal={val => updateQuestions(val)}
        />
        <AnimatedCheckbox
          title="I wanna play too"
          val={state.isPlaying}
          toggle={() => (state.isPlaying = !state.isPlaying)}
        />
        <AnimatedCheckbox
          title="Show questions to players"
          val={state.showQuestions}
          toggle={() => (state.showQuestions = !state.showQuestions)}
        />
      </Screen>
      <BottomButton
        title="Start game"
        onPress={async () => {
          const id = humanId()
          await createGame(questions, id)
          navigation.navigate('WaitingRoom', { isWaiting: true })
        }}
      />
    </>
  )
}

export default view(Setup)
