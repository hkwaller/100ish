import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import Screen from 'app/components/Screen'
import Player from '../leader/components/Player'
import { state } from 'app/config/store'
import { listenToGameUpdates } from 'app/config/api'
import BottomButton from './components/BottomButton'

function Lounge() {
  const navigation = useNavigation()

  useEffect(() => {
    listenToGameUpdates()
  }, [])

  return (
    <>
      <Screen title="Lounge">
        <View style={styles.playerContainer}>
          {state.game?.players?.map((p, index) => {
            return <Player key={index} name={p.name} isFinished={true} />
          })}
        </View>
      </Screen>
      <BottomButton
        title="Start playing"
        isVisible={state.game?.isReady}
        onPress={() => {
          navigation.navigate('Respond')
        }}
      />
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
