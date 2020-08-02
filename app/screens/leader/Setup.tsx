import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'
import humanId from 'human-id'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import BottomButton from '../player/components/BottomButton'
import { createGame } from 'app/config/api'
import { state } from 'app/config/store'
import AnimatedCheckbox from './components/AnimatedCheckbox'
import Languages from './components/Languages'

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
        <AnimatedCheckbox
          title="Show everyone's scores"
          val={state.showAllScores}
          toggle={() => (state.showAllScores = !state.showAllScores)}
        />
        <Languages />
      </Screen>
      <BottomButton
        title="Start game"
        onPress={async () => {
          const id = humanId({ separator: '-', capitalize: false })
          await createGame(questions, id)
          navigation.navigate('WaitingRoom', { isWaiting: true })
        }}
      />
    </>
  )
}

export default view(Setup)
