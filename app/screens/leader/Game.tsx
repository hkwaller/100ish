import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import Screen from 'app/components/Screen'
import { state } from 'app/config/store'
import { colors } from 'app/config/constants'
import Question from './components/Question'
import { PageHeader } from 'app/components'
import BottomButton from '../player/components/BottomButton'
import { submitAnswers } from 'app/config/api'

function Game() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState(
    (state.game?.questions || []).map(_ => 0)
  )

  const [buttonText, setButtonText] = useState<string>('Next')
  const list = useRef<FlatList>(null)
  const navigation = useNavigation()

  useEffect(() => {
    if (activeIndex === state.game.questions.length - 1)
      setButtonText('Continue')
  }, [activeIndex])

  function nextPressed() {
    setActiveIndex(prev => ++prev)
    if (activeIndex < state.game.questions.length - 1) {
      list.current?.scrollToIndex({ index: activeIndex + 1 })
    } else {
      state.isPlaying && submitAnswers(answers)
      navigation.navigate('ResultsWaitingRoom')
    }
  }

  function updateValue(val: number, index: number) {
    const updatedAnswers = answers
    updatedAnswers[index] = val
    setAnswers([...updatedAnswers])
  }

  return (
    <>
      <Screen noPadding title="Game">
        <PageHeader
          style={{ paddingLeft: 24, paddingTop: 24, marginBottom: 24 }}
        >
          Game {activeIndex + 1}/{state.game.questions.length}
        </PageHeader>
        <FlatList
          ref={list}
          horizontal
          keyExtractor={item => item._createdAt}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'flex-start',
          }}
          ItemSeparatorComponent={() => (
            <View style={{ width: 20, backgroundColor: colors.GREY }} />
          )}
          data={state.game?.questions}
          pagingEnabled
          renderItem={({ item, index }) => {
            return (
              <Question
                question={item}
                index={index}
                updateVal={val => updateValue(val, index)}
              />
            )
          }}
        />
      </Screen>
      <BottomButton
        title={buttonText}
        onPress={() => {
          nextPressed()
        }}
      />
    </>
  )
}

export default view(Game)
