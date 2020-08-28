import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Screen from 'app/components/Screen'
import { purchaseItemAsync } from 'expo-in-app-purchases'

import { view } from '@risingstack/react-easy-state'
import Languages from '../leader/components/Languages'
import { Bold } from 'app/components'
import { state } from 'app/config/store'
import { colors } from 'app/config/constants'
import { setupPurchaseListener, setupPurchases } from 'app/config/utils'

function Settings() {
  async function purchase() {
    await setupPurchases()
    await setupPurchaseListener()
    await purchaseItemAsync('premium')
  }

  async function restore() {
    await setupPurchases()
  }

  return (
    <Screen title="Settings">
      <Languages />
      {!state.hasPurchased && (
        <View style={styles.purchaseContainer}>
          <Bold style={styles.purchaseHeader}>Unlock everything</Bold>
          <Text>
            You don't have to do this now if you don't want to. You can still
            play {Math.max(0, 10 - state.timesPlayed)} games for free.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => purchase()}>
            <Bold style={{ fontSize: 18 }}>Purchase full app</Bold>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.SLATE }]}
            onPress={() => restore()}
          >
            <Bold style={{ fontSize: 18 }}>Restore purchases</Bold>
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
export default view(Settings)
