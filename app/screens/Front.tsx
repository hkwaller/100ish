import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as StoreReview from 'expo-store-review'

import { colors } from 'app/config/constants'
import { Welcome } from 'app/components'
import BigButton from 'app/components/BigButton'
import Screen from 'app/components/Screen'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'
import { Bold } from 'app/components'
import { purchaseApp } from 'app/config/utils'

function Front() {
  const navigation = useNavigation()

  setTimeout(() => {
    if (state.timesPlayed > 0 && state.timesPlayed % 5 === 0) {
      StoreReview.requestReview()
    }
  }, 1000)
  async function purchase() {
    await purchaseApp()
  }

  return (
    <Screen hideBackButton>
      <Welcome style={{ marginBottom: 20 }}>Welcome</Welcome>
      <BigButton
        title="I’m the game master"
        onPress={() => navigation.navigate('Leader')}
        bgColor={colors.PURPLE}
      />
      <BigButton
        title="I’m participating"
        onPress={() => navigation.navigate('Respond')}
        bgColor={colors.GREEN}
      />
      {/* <BigButton
        title="Add question"
        onPress={() => navigation.navigate('Add')}
        bgColor={colors.RED}
      /> */}
      <BigButton
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        bgColor={colors.RED}
      />
      {state.timesPlayed > 5 && !state.hasPurchased && (
        <View style={{ alignItems: 'flex-start', marginTop: 30 }}>
          <Bold>
            You still haven't purchased the full app. No worries, you still have{' '}
            {Math.max(0, 10 - state.timesPlayed)} games to play for free.
          </Bold>

          <TouchableOpacity style={styles.button} onPress={() => purchase()}>
            <Bold>Purchase full app</Bold>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  purchaseContainer: { marginTop: 20, padding: 20, alignItems: 'flex-start' },
  purchaseHeader: { fontSize: 20, marginBottom: 10 },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: colors.GREEN,
    marginTop: 20,
    borderRadius: 30,
  },
})

export default view(Front)
