import React, { useState } from 'react'
import Screen from 'app/components/Screen'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from 'app/config/constants'
import { Bold } from 'app/components'
import Slider from 'app/components/Slider'
import BottomButton from '../player/components/BottomButton'

function AddQuestion() {
  const [value, setValue] = useState(0)
  const [question, setQuestion] = useState('')

  return (
    <>
      <Screen title="Add">
        <Bold style={{ marginBottom: 20 }}>Question</Bold>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setQuestion(text)}
          multiline
          placeholder="Enter your question..."
        />
        <Bold style={{ marginBottom: 20 }}>Answer</Bold>
        <Slider updateVal={val => setValue(val)} />
      </Screen>
      <BottomButton
        isVisible={question.length > 5}
        title="Submit question"
        onPress={() => {}}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.WHITE,
    padding: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
})
export default AddQuestion
