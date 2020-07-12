import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from 'app/components/Screen'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated'

import { getGame } from 'app/config/api'
import { state } from 'app/config/store'
import { PageHeader } from 'app/components'
import Player from './components/Player'
import BottomButton from '../respond/components/BottomButton'

function getAnimatedValue(allFinished: boolean) {
  'worklet'
  if (!allFinished) return 120
  else return 0
}

function WaitingRoom() {
  const navigation = useNavigation()
  const animation = useSharedValue(120)

  useEffect(() => {
    getGame('69a2ed74-40f6-448e-a9a3-24a3123c4187')
  }, [])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(animation.value) }],
    }
  })

  function toggle(index: number) {
    if (!state.game) return

    state.game.players[index].isFinished = !state.game?.players[index]
      .isFinished

    const allFinished = state.game?.players.every(p => p.isFinished)
    animation.value = getAnimatedValue(allFinished)
  }

  const playersDone = state.game?.players.reduce((acc, cur) => {
    return acc + (cur.isFinished ? 1 : 0)
  }, 0)

  const playersPlaying = state.game?.players.length

  return (
    <>
      <Screen>
        <PageHeader>
          Players done {playersDone}/{playersPlaying}{' '}
        </PageHeader>
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
          title="Show results"
          onPress={() => {
            navigation.navigate('Results')
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
