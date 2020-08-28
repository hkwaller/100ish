import React, { useRef, useLayoutEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native'
import * as StoreReview from 'expo-store-review'
import * as InAppPurchases from 'expo-in-app-purchases'
import { view } from '@risingstack/react-easy-state'
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated'

import { colors } from 'app/config/constants'
import { Welcome } from 'app/components'
import BigButton from 'app/components/BigButton'
import Screen from 'app/components/Screen'
import { state } from 'app/config/store'
import { Bold } from 'app/components'
import Intro from 'app/components/Intro'
import { listenToGameUpdates } from 'app/config/api'
import { setupPurchases, setupPurchaseListener } from 'app/config/utils'

const transition = (
  <Transition.Together>
    <Transition.In interpolation="easeInOut" type="slide-right" delayMs={300} />
  </Transition.Together>
)
function Front() {
  const navigation = useNavigation()
  const route = useRoute()
  const restoreButtonRef = useRef<TransitioningView>(null)

  useFocusEffect(
    React.useCallback(() => {
      if (
        state.timesPlayed > 0 &&
        state.timesPlayed % 5 === 0 &&
        !state.hasAsked &&
        Platform.OS === 'ios' &&
        route.params?.checkForReview
      ) {
        review()
        state.hasAsked = true
      }
    }, [route.params?.checkForReview])
  )

  useLayoutEffect(() => {
    if (state.game) {
      restoreButtonRef.current?.animateNextTransition()
    }
  }, [state.game])

  async function review() {
    await StoreReview.requestReview()
  }

  async function purchase() {
    await setupPurchases()
    await setupPurchaseListener()
    await InAppPurchases.purchaseItemAsync('premium')
  }

  async function restore() {
    await setupPurchases()
  }

  const limited = !state.hasPurchased && state.timesPlayed > 10

  return (
    <>
      <Screen hideBackButton>
        <Welcome style={{ marginBottom: 20 }}>Welcome</Welcome>
        {!limited && (
          <View style={{ overflow: 'hidden' }}>
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
            <BigButton
              title="Settings"
              onPress={() => navigation.navigate('Settings')}
              bgColor={colors.RED}
            />
            {state.game && (
              <Transitioning.View
                ref={restoreButtonRef}
                transition={transition}
              >
                <BigButton
                  title="Restore previous game"
                  bgColor={colors.TURQUOISE}
                  onPress={() => {
                    listenToGameUpdates()
                    if (state.game?.players[0].name === state.player?.name) {
                      navigation.navigate('Leader', {
                        screen: 'Game',
                        params: { isLoadedFromCache: true },
                      })
                    } else {
                      navigation.navigate('Respond', {
                        screen: 'Respond',
                        params: { isLoadedFromCache: true },
                      })
                    }
                  }}
                />
              </Transitioning.View>
            )}
          </View>
        )}
        {/* <BigButton
        title="Add question"
        onPress={() => navigation.navigate('Add')}
        bgColor={colors.RED}
      /> */}
        {state.timesPlayed > 5 && !state.hasPurchased && (
          <View style={{ alignItems: 'flex-start', marginTop: 30 }}>
            <Bold>
              {limited
                ? 'In order to continue you need to purchase the app. Thank you for trying it out, and I hope to see you again.'
                : `You still haven't purchased the full app. No worries, you still have ${Math.max(
                    0,
                    10 - state.timesPlayed
                  )} games to play for free.`}
            </Bold>

            <TouchableOpacity style={styles.button} onPress={() => purchase()}>
              <Bold>Purchase full app</Bold>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.SLATE }]}
              onPress={() => restore()}
            >
              <Bold>Restore purchases</Bold>
            </TouchableOpacity>
          </View>
        )}
      </Screen>
      {!state.hasSeenIntro && <Intro />}
    </>
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
