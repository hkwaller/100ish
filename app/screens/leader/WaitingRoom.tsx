import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from 'app/components/Screen'
import { view } from '@risingstack/react-easy-state'
import { useNavigation, useRoute } from '@react-navigation/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import {
  stopListening,
  readyGame,
  getGame,
  inactivateGame,
} from 'app/config/api'
import { state } from 'app/config/store'
import { PageHeader, Bold } from 'app/components'
import Player from './components/Player'
import BottomButton from '../player/components/BottomButton'

function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState(false)
  const navigation = useNavigation()
  const animation = useSharedValue(120)
  const route = useRoute()

  useEffect(() => {
    setIsWaiting(route.params?.isWaiting)
    getGame(state.game?.gamename)
  }, [])

  useEffect(() => {
    if (isWaiting) animation.value = 0
  }, [isWaiting])

  useEffect(() => {
    if (state.game?.players.every(p => p.isFinished)) {
      animation.value = 0
    }
  }, [state.game])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(animation.value, { damping: 15 }) }],
    }
  })

  function toggle(index: number) {
    if (!state.game) return

    state.game.players[index].isFinished = !state.game?.players[index]
      .isFinished

    const allFinished = state.game?.players.every(p => p.isFinished)
    animation.value = allFinished ? 0 : 120
  }

  const playersDone = state.game?.players.reduce((acc, cur) => {
    return acc + (cur.isFinished ? 1 : 0)
  }, 0)

  const playersPlaying = state.game?.players.length

  return (
    <>
      <Screen>
        <PageHeader style={{ marginBottom: 24 }}>
          Players {playersDone || 0}/{playersPlaying || 0}{' '}
        </PageHeader>
        <Bold style={{ marginVertical: 20 }}>
          Gamename: {state.game?.gamename}
        </Bold>
        <View style={styles.playerContainer}>
          {state.game?.players?.map((p, index) => {
            return (
              <Player
                key={p.name}
                name={p.name}
                isFinished={p.isFinished}
                toggle={() => toggle(index)}
              />
            )
          })}
        </View>
      </Screen>
      <Animated.View style={style}>
        <BottomButton
          title={isWaiting ? 'Go to game' : 'Show Results'}
          onPress={() => {
            isWaiting ? readyGame() : inactivateGame()
            navigation.navigate(isWaiting ? 'Game' : 'Results')
          }}
        />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default view(WaitingRoom)
