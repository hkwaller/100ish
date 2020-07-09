import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import Screen from 'app/components/Screen'
import { state } from 'app/config/store'
import { colors } from 'app/config/constants'
import Question from './components/Question'
import { PageHeader } from 'app/components'
import BottomButton from '../respond/components/BottomButton'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

function Game() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [buttonText, setButtonText] = useState<string>('Next')
  const list = useRef<FlatList>(null)
  const navigation = useNavigation()

  function nextPressed() {
    setActiveIndex(prev => ++prev)
    if (activeIndex < state.questions.length - 1) {
      list.current?.scrollToIndex({ index: activeIndex + 1 })
    } else {
      navigation.navigate('WaitingRoom')
    }
  }

  useEffect(() => {
    if (activeIndex === state.questions.length - 1) setButtonText('Continue')
  }, [activeIndex])

  return (
    <>
      <Screen noPadding>
        <PageHeader style={{ paddingLeft: 24, paddingTop: 24 }}>
          Game
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
          data={state.questions}
          pagingEnabled
          renderItem={({ item }) => {
            return <Question question={item} />
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