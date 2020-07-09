import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import BottomButton from '../respond/components/BottomButton'
import { getQuestions } from 'app/config/api'
import { useNavigation } from '@react-navigation/native'
import { PageHeader } from 'app/components'
import { colors } from 'app/config/constants'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'

function Setup() {
  const navigation = useNavigation()

  return (
    <>
      <Screen>
        <PageHeader>Setup</PageHeader>
        <Slider header="Players" max={10} />
        <Slider header="Questions" max={10} />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backgroundColor: state.isPlaying ? colors.RED : colors.GREY,
          }}
          onPress={() => (state.isPlaying = !state.isPlaying)}
        >
          <PageHeader>I wanna play to!</PageHeader>
        </TouchableOpacity>
      </Screen>
      <BottomButton
        title="Start game"
        onPress={() => {
          getQuestions(3)
          navigation.navigate('Game')
        }}
      />
    </>
  )
}
export default view(Setup)
