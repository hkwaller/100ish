import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { nouns, adjectives, verbs } from 'human-id'
import { useNavigation } from '@react-navigation/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import Suggestion from './components/Suggestion'
import BottomButton from './components/BottomButton'
import { getGame, addPlayer } from 'app/config/api'

const words = [adjectives, nouns, verbs]

function StartGame() {
  const [gameName, setGameName] = useState<string>('')
  const [wordsEntered, setWordsEntered] = useState(0)
  const [suggestions, setSuggestions] = useState(adjectives)
  const navigation = useNavigation()

  const textInputRef = useRef<TextInput>(null)

  const animation = useSharedValue(120)

  useEffect(() => {
    if (wordsEntered === words.length) {
      animation.value = 0
      textInputRef.current?.blur()
      return
    }

    setSuggestions(words[Math.min(wordsEntered, 2)])
  }, [wordsEntered])

  useEffect(() => {
    if (
      suggestions.filter(w => gameName.toLowerCase().includes(w)).length > 0
    ) {
      setWordsEntered(prev => ++prev)
    }
  }, [gameName])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(animation.value, { damping: 15 }) }],
    }
  })

  return (
    <>
      <Screen>
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>
          Enter game room name {wordsEntered}
        </Bold>
        <TextInput
          style={styles.textInput}
          value={gameName}
          ref={textInputRef}
          onChangeText={val => setGameName(val)}
          placeholder="Type in the room name.."
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', marginTop: 20 }}
        >
          {suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                key={index}
                word={suggestion}
                onPress={() => {
                  setGameName(prev => `${prev}${suggestion}`)
                }}
              />
            )
          })}
        </ScrollView>
      </Screen>
      <Animated.View style={style}>
        <BottomButton
          onPress={async () => {
            await getGame(gameName)
            await addPlayer()
            navigation.navigate('Lounge')
          }}
          title="Go to quiz"
        />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.WHITE,
    padding: 20,
    fontFamily: fonts.REGULAR,
    fontSize: 20,
  },
})

export default StartGame
