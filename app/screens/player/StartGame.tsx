import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { nouns, adjectives, verbs } from 'human-id'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import BottomButton from './components/BottomButton'
import { getGame, addPlayer } from 'app/config/api'
import { state } from 'app/config/store'

const words = [adjectives, nouns, verbs]

function StartGame() {
  const [gameName, setGameName] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>(state.player?.name || '')
  const [wordsEntered, setWordsEntered] = useState(0)
  const [suggestions, setSuggestions] = useState(adjectives)
  const navigation = useNavigation()

  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (wordsEntered === words.length) {
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
    } else if (gameName.length === 0) setWordsEntered(0)
  }, [gameName.length])

  return (
    <>
      <Screen title="Join">
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>Enter your name</Bold>
        <TextInput
          style={[styles.textInput, { marginBottom: 50 }]}
          value={playerName}
          onChangeText={val => setPlayerName(val)}
          clearButtonMode="while-editing"
          placeholder="Type your name"
        />
        <Bold style={{ fontSize: 30, marginBottom: 20 }}>
          Enter game room name {wordsEntered}
        </Bold>
        <TextInput
          style={styles.textInput}
          value={gameName}
          ref={textInputRef}
          clearButtonMode="while-editing"
          onChangeText={val => setGameName(val)}
          placeholder="Type in the room name.."
        />
      </Screen>
      <BottomButton
        title="Go to quiz"
        isVisible={wordsEntered === words.length}
        onPress={async () => {
          await getGame(gameName)
          await addPlayer(playerName)
          navigation.navigate('Lounge')
        }}
      />
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
