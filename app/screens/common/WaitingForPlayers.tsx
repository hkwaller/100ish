import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Bold } from 'app/components'
import Loading from 'app/components/Loading'
import { getGame } from 'app/config/api'
import { colors } from 'app/config/constants'
import { state } from 'app/config/store'

function WaitingForPlayers() {
  return (
    <View style={styles.waiting}>
      <Bold style={styles.waitingText}>Waiting for other players...</Bold>
      <Loading color={colors.RED} value={state.game?.isOpen} />
      <TouchableOpacity
        onPress={async () => {
          state.game = await getGame(state.game?.gamename)
        }}
      >
        <Bold style={{ textAlign: 'center' }}>
          Nothing happening? Tap here to refresh game
        </Bold>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  waiting: {
    padding: 20,
    alignItems: 'center',
  },
  waitingText: { marginBottom: 40, fontSize: 20, textAlign: 'center' },
  playerScoresText: {
    marginRight: 10,
    marginBottom: 10,
  },
})

export default WaitingForPlayers
