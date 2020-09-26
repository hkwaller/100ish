import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { Bold } from 'app/components'
import { colors } from 'app/config/constants'

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
          paddingVertical: 15,
          marginTop: 20,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Bold style={{ color: colors.WHITE, fontSize: 16 }}>{title}</Bold>
    </TouchableOpacity>
  )
}
export default ResultsButton
