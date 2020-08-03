import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'
import humanId from 'human-id'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import BottomButton from '../player/components/BottomButton'
import { createGame, addPlayer } from 'app/config/api'
import { state } from 'app/config/store'
import AnimatedCheckbox from './components/AnimatedCheckbox'
import Languages from './components/Languages'
import { colors, fonts } from 'app/config/constants'
import { Bold } from 'app/components'

function Setup() {
  const [questions, setQuestions] = useState(5)
  const [playerName, setPlayerName] = useState(state.player?.name || '')
  const navigation = useNavigation()

  function updateQuestions(val: number) {
    setQuestions(val)
  }

  return (
    <>
      <Screen title="Setup">
        <Bold style={{ marginBottom: 10 }}>Enter your name</Bold>
        <TextInput
          style={[styles.textInput, { marginBottom: 20 }]}
          value={playerName}
          onChangeText={(val: string) => setPlayerName(val)}
          clearButtonMode="while-editing"
          placeholder="Type your name"
        />
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

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.WHITE,
    padding: 20,
    fontFamily: fonts.REGULAR,
    fontSize: 20,
  },
})

export default view(Setup)
