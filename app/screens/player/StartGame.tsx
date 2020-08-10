import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  LayoutAnimation,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import BottomButton from './components/BottomButton'
import { getGame, addPlayer, startListening } from 'app/config/api'
import { state } from 'app/config/store'
import { validateGameWord } from 'app/config/utils'

function StartGame() {
  const [gameName, setGameName] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>(state.player?.name || '')
  const [isValid, setIsValid] = useState(false)
  const navigation = useNavigation()
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (validateGameWord(gameName)) {
      setIsValid(true)
      textInputRef.current?.blur()
    }
  }, [gameName])

  async function get() {
    state.isLoading = true
    const game = await getGame(gameName)

    if (!game.isOpen) {
      state.error = 'This game is closed'
    }
    console.log(`got game with gamename ${game.gamename}`)
    state.game = game
    state.isTranslated = game.language !== 'en'
  }

  return (
    <>
      <Screen title="Join">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Bold style={{ fontSize: 30, marginBottom: 20 }}>
            Enter your name
          </Bold>
          <TextInput
            style={[styles.textInput, { marginBottom: 50 }]}
            value={playerName}
            onChangeText={(val: string) => setPlayerName(val)}
            clearButtonMode="while-editing"
            placeholder="Type your name"
          />
          <Bold style={{ fontSize: 30, marginBottom: 20 }}>
            Enter game room name
          </Bold>
          <TextInput
            style={styles.textInput}
            value={gameName}
            ref={textInputRef}
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(val: string) => setGameName(val)}
            placeholder="Type in the room name.."
          />
          {state.error.length > 0 && (
            <Bold style={{ marginTop: 20, color: colors.RED }}>
              {state.error}
            </Bold>
          )}
          <View style={{ marginVertical: 20 }} />
        </ScrollView>
      </Screen>
      <BottomButton
        title="Go to quiz"
        isVisible={isValid}
        onPress={async () => {
          if (!playerName || playerName.length === 0) {
            state.error = 'You need to enter player name'
            return
          }

          await get()

          if (state.error.length === 0) {
            await startListening()
            await addPlayer(playerName)
            navigation.navigate('Lounge')
          } else {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
          }

          state.isLoading = false
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

export default view(StartGame)
