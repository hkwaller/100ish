import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Question as QuestionType, state } from 'app/config/store'
import { screen, colors } from 'app/config/constants'
import { QuestionText } from 'app/components'
import Slider from 'app/components/Slider'

type Props = {
  question: QuestionType
  updateVal: (answer: number) => void
  index: number
}

function Question({ question, updateVal, index }: Props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <QuestionText>{question.title}</QuestionText>
      </View>
      {state.isPlaying && <Slider number={index + 1} updateVal={updateVal} />}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 24,
    width: screen.WIDTH - 48,
    marginLeft: 24,
  },
  container: {
    padding: 24,
    backgroundColor: colors.PURPLE,
    paddingBottom: 48,
  },
})
export default Question
