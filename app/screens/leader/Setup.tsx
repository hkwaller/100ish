import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import BottomButton from '../player/components/BottomButton'
import { createGame } from 'app/config/api'
import { PageHeader } from 'app/components'
import { colors } from 'app/config/constants'
import { state } from 'app/config/store'

function Setup() {
  const navigation = useNavigation()
  const [questions, setQuestions] = useState(5)

  return (
    <>
      <Screen>
        <PageHeader>Setup</PageHeader>
        <Slider
          header="Questions"
          max={10}
          updateVal={val => setQuestions(val)}
        />
        <TouchableOpacity
          style={[
            styles.isPlaying,
            { backgroundColor: state.isPlaying ? colors.RED : colors.GREY },
          ]}
          onPress={() => (state.isPlaying = !state.isPlaying)}
        >
          <PageHeader>I wanna play to!</PageHeader>
        </TouchableOpacity>
      </Screen>
      <BottomButton
        title="Start game"
        onPress={async () => {
          await createGame(questions, state.isPlaying)
          navigation.navigate('WaitingRoom', { isWaiting: true })
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  isPlaying: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

export default view(Setup)
