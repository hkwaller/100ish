import React, { useState } from 'react'
import { TouchableOpacity, SafeAreaView } from 'react-native'
import Slider from 'app/components/Slider'
import Screen from 'app/components/Screen'
import { colors } from 'app/config/constants'
import { Bold } from 'app/components'
import { useNavigation } from '@react-navigation/native'
import BottomButton from './components/BottomButton'

function Start() {
  const [answer, setAnswer] = useState(0)
  const navigation = useNavigation()

  return (
    <>
      <Screen>
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>Input answers</Bold>
        <Slider number={1} updateVal={val => setAnswer(val)} />
        <Slider number={2} />
        <Slider number={3} />
      </Screen>
      <BottomButton
        onPress={() => navigation.navigate('Answers', { answer: answer })}
        title="Check answers!"
      />
    </>
  )
}

export default Start
