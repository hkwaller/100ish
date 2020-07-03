import React, { useState } from 'react'
import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import { useRoute } from '@react-navigation/native'
import { Bold } from 'app/components'
import { View } from 'react-native'
import BottomButton from './components/BottomButton'

type Props = {}

function Answers(): Props {
  const [val, setVal] = useState(0)
  const route = useRoute()

  return (
    <>
      <Screen>
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>
          Enter correct answers
        </Bold>

        <Slider
          number={1}
          response={route.params.answer}
          updateVal={val => setVal(val)}
        />
      </Screen>
      <BottomButton title={Math.abs(val - route.params.answer)} />
    </>
  )
}
export default Answers
