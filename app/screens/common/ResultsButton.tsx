import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { Bold } from 'app/components'
import { getNewGame } from 'app/config/api'
import { colors } from 'app/config/constants'
import { isGameLeader } from 'app/config/utils'

type Props = {
  title: string
  backgroundColor: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

function ResultsButton({ title, backgroundColor, style, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        {
          backgroundColor: backgroundColor,
          paddingHorizontal: 30,
          paddingVertical: 20,
          marginTop: 20,
        },
        style,
      ]}
    >
      <Bold style={{ color: colors.WHITE, fontSize: 20 }}>{title}</Bold>
    </TouchableOpacity>
  )
}
export default ResultsButton
