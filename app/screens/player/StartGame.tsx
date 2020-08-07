import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  LayoutAnimation,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { view } from '@risingstack/react-easy-state'

import Screen from 'app/components/Screen'
import { Bold } from 'app/components'
import { colors, fonts, screen } from 'app/config/constants'
import BottomButton from './components/BottomButton'
import { getGame, addPlayer, listenToGameUpdates } from 'app/config/api'
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

  useEffect(() => {
    if (state.error.length > 0) {
      setTimeout(() => {
        state.error = ''
      }, 3000)
    }
  }, [state.error])

  return (
    <>
      <Screen title="Join">
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
        </KeyboardAwareScrollView>
      </Screen>
      <BottomButton
        title="Go to quiz"
        isVisible={isValid}
        onPress={async () => {
          if (!playerName || playerName.length === 0) {
            state.error = 'You need to enter player name'
            return
          }

          state.isLoading = true
          await getGame(gameName)
          if (state.error.length === 0) {
            await listenToGameUpdates()
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
