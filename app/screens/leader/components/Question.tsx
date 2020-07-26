import React from 'react'
import { View, StyleSheet, Button, LayoutAnimation } from 'react-native'
import { Question as QuestionType, state } from 'app/config/store'
import { screen, colors } from 'app/config/constants'
import { QuestionText, Bold } from 'app/components'
import Slider from 'app/components/Slider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { replaceQuestion } from 'app/config/api'
import { view } from '@risingstack/react-easy-state'

type Props = {
  question: QuestionType
  updateVal: (answer: number) => void
  index: number
}

function Question({ question, updateVal, index }: Props) {
  return (
    <View style={styles.outerContainer}>
      <QuestionText style={styles.question}>{question.title}</QuestionText>
      {state.isPlaying && (
        <Slider number={index + 1} updateVal={val => updateVal(val)} />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          replaceQuestion(index)
        }}
      >
        <Bold style={{ fontSize: 20, color: colors.WHITE }}>
          Replace question
        </Bold>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 24,
    width: screen.WIDTH - 48,
    marginLeft: 24,
  },
  question: {
    padding: 24,
    backgroundColor: colors.PURPLE,
    paddingBottom: 48,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.RED,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 50,
    marginTop: 30,
  },
})
export default view(Question)
