import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Screen from 'app/components/Screen'
import { view } from '@risingstack/react-easy-state'
import { useNavigation, useRoute } from '@react-navigation/native'

import { readyGame, inactivateGame, getGame } from 'app/config/api'
import { state } from 'app/config/store'
import { PageHeader, Bold } from 'app/components'
import Player from './components/Player'
import BottomButton from '../player/components/BottomButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    setIsWaiting(route.params?.isWaiting || false)
  }, [])

  function toggle(index: number) {
    if (!state.game || !state.game.players[index]) return

    state.game.players[index].isFinished = !state.game?.players[index]
      .isFinished
  }

  const playersDone = state.game?.players.reduce((acc, cur) => {
    return acc + (cur.isFinished ? 1 : 0)
  }, 0)

  const playersPlaying = state.game?.players.length

  return (
    <>
      <Screen title="Lounge">
        <PageHeader style={{ marginBottom: 24 }}>
          Players {playersDone || 0}/{playersPlaying || 0}{' '}
        </PageHeader>
        <Bold style={{ marginVertical: 20, fontSize: 20 }}>
          Gamename: {state.displayGameName}
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
        title={isWaiting ? 'Go to game' : 'Show Results'}
        isVisible={state.game?.players.every(p => p.isFinished) || isWaiting}
        onPress={async () => {
          isWaiting ? await readyGame() : await inactivateGame()
          navigation.navigate(isWaiting ? 'Game' : 'Results')
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

export default view(WaitingRoom)
