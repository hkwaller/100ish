import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Question as QuestionType, state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'

import { screen, colors } from 'app/config/constants'
import { QuestionText } from 'app/components'
import Slider from 'app/components/Slider'
import { replaceQuestion, removeQuestion, reportQuestion } from 'app/config/api'
import QuestionButton from './QuestionButton'
import { getTranslatedTitle } from 'app/config/utils'

type Props = {
  question: QuestionType
  updateVal: (answer: number) => void
  index: number
  previous?: () => void
  isLoadedFromCache: boolean
  defaultValue: number | undefined
}

function Question({
  question,
  updateVal,
  index,
  previous,
  defaultValue,
}: Props) {
  return (
    <View style={styles.outerContainer}>
      <QuestionText style={styles.question}>
        {getTranslatedTitle(question).replace(/&quot;/g, '"')}
      </QuestionText>
      {state.isPlaying && (
        <Slider
          number={index + 1}
          updateVal={val => updateVal(val)}
          defaultValue={defaultValue || undefined}
        />
      )}
      <View style={styles.buttonContainer}>
        <QuestionButton
          title="Replace"
          backgroundColor={colors.RED}
          onPress={async () => {
            await replaceQuestion(index)
          }}
        />
        {__DEV__ && (
          <QuestionButton
            title="Remove"
            backgroundColor={colors.BLACK}
            onPress={async () => {
              await removeQuestion(question._id)
              await replaceQuestion(index)
            }}
          />
        )}
        {index !== 0 && (
          <QuestionButton
            title="Previous"
            backgroundColor={colors.GREEN}
            onPress={() => {
              previous && previous()
            }}
          />
        )}
        <QuestionButton
          title="Report"
          backgroundColor={colors.BLACK}
          onPress={async () => {
            await reportQuestion(question)
          }}
        />
        {state.game?.language !== 'en' && (
          <QuestionButton
            title={state.isTranslated ? 'Original' : 'Translated'}
            backgroundColor={colors.TURQUOISE}
            onPress={() => {
              state.isTranslated = !state.isTranslated
            }}
          />
        )}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default view(Question)
