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

function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')'
}

export default Question