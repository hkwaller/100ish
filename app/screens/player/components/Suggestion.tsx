import React from 'react'
import { StyleSheet } from 'react-native'
import { Bold } from 'app/components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from 'app/config/constants'

type Props = {
  word: string
  onPress: () => void
}

function Suggestion({ word, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Bold style={{ fontSize: 20 }}>{word}</Bold>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    marginRight: 15,
    borderRadius: 20,
  },
})
export default Suggestion
