import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import Screen from 'app/components/Screen'
import Player from '../leader/components/Player'
import { state } from 'app/config/store'
import { listenToGameUpdates, getGame } from 'app/config/api'
import BottomButton from './components/BottomButton'
import { Bold } from 'app/components'

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
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={async () => {
            state.game = await getGame(state.game?.gamename)
          }}
        >
          <Bold
            style={{
              borderBottomWidth: 2,
              paddingBottom: 2,
              borderBottomColor: '#000',
            }}
          >
            Nothing happening? Tap here to reload
          </Bold>
        </TouchableOpacity>
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
