import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import Screen from 'app/components/Screen'
import { PageHeader } from 'app/components'
import Player from '../leader/components/Player'
import { state } from 'app/config/store'
import { listenToGameUpdates } from 'app/config/api'
import { view } from '@risingstack/react-easy-state'
import BottomButton from './components/BottomButton'
import { useNavigation } from '@react-navigation/native'

function Lounge() {
  const animation = useSharedValue(120)
  const navigation = useNavigation()

  useEffect(() => {
    listenToGameUpdates()
  }, [])

  useEffect(() => {
    if (state.game?.isReady) animation.value = 0
    else animation.value = 120
  }, [state.game?.isReady])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(animation.value, { damping: 15 }) }],
    }
  })

  return (
    <>
      <Screen>
        <PageHeader>Player lounge</PageHeader>
        <View style={styles.playerContainer}>
          {state.game?.players?.map((p, index) => {
            return <Player key={index} name={p.name} isFinished={true} />
          })}
        </View>
      </Screen>
      <Animated.View style={style}>
        <BottomButton
          title="Start playing"
          onPress={() => {
            navigation.navigate('Respond')
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

export default view(Lounge)
