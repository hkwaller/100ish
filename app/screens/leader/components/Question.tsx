import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Question as QuestionType } from 'app/config/store'
import { screen, colors } from 'app/config/constants'
import { QuestionText } from 'app/components'

type Props = {
  question: QuestionType
}

function Question({ question }: Props) {
  return (
    <View style={[styles.container, { marginLeft: 24 }]}>
      <QuestionText>{question.title}</QuestionText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screen.WIDTH - 48,
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: colors.PURPLE,
    paddingBottom: 48,
  },
})
export default Question
