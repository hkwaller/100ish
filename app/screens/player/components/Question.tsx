import React, { useState } from 'react'
import { View } from 'react-native'

import { Bold } from 'app/components'
import Slider from 'app/components/Slider'
import { colors } from 'app/config/constants'
import { state } from 'app/config/store'

type Props = {
  title: string
  updateVal: (val: number) => void
  number: number
}

function Question({ title, updateVal, number }: Props) {
  const [isActive, setIsActive] = useState(false)

  return (
    <View>
      {state.game?.showQuestions && (
        <Bold
          style={{
            marginBottom: 12,
            marginTop: 10,
            fontSize: 16,
            color: isActive ? colors.DARKGREY : colors.BLACK,
          }}
        >
          {title}
        </Bold>
      )}
      <Slider
        number={number}
        setQuestionActiveCallback={isActive => setIsActive(isActive)}
        updateVal={(val: number) => updateVal(val)}
      />
    </View>
  )
}

export default Question
