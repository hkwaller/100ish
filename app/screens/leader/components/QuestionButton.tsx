import React from 'react'
import { TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native'
import { colors } from 'app/config/constants'
import { Bold } from 'app/components'

type Props = {
  onPress: () => void
  title: string
  backgroundColor: string
}

function QuestionButton({ title, onPress, backgroundColor }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={async () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        onPress()
      }}
    >
      <Bold style={{ fontSize: 20, color: colors.WHITE }}>{title}</Bold>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 50,
    marginTop: 10,
    marginRight: 10,
  },
})

export default QuestionButton
