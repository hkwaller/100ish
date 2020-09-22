import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'

import { Bold, PageHeader } from 'app/components'
import { state } from 'app/config/store'
import { getPlayerScore } from 'app/config/utils'
import Screen from 'app/components/Screen'
import CountUp from 'app/components/Count'
import { colors } from 'app/config/constants'

type PlayerScore = {
  name: string
  totalScore: number
}

const backgroundColors = [
  colors.TURQUOISE,
  colors.RED,
  colors.YELLOW,
  colors.LAVENDEL,
  colors.DARKGREY,
  colors.GREY,
]

function History() {
  const [players, setPlayers] = useState<PlayerScore[]>(
    state.game.players.map(p => {
      return { name: p.name, totalScore: 0 }
    })
  )

  return (
    <Screen title="Total">
      {players.map((p, i) => {
        const total = state.history.reduce((acc, curGame) => {
          return acc + getPlayerScore(curGame.players[i].answers)
        }, 0)

        return (
          <View key={i} style={styles.totalScoresRow}>
            <Bold style={{ fontSize: 24, marginTop: 12 }}>{p.name}</Bold>
            <CountUp to={total} />
          </View>
        )
      })}
      <View style={styles.divider} />
      {state.history.map((game, index) => {
        return (
          <View key={index}>
            <Bold style={{ fontSize: 20, marginBottom: 10 }}>
              Game #{index + 1}
            </Bold>
            <View style={styles.gameScoreRow}>
              {game.players.map((player, pIndex) => {
                const score = getPlayerScore(player.answers)
                return (
                  <View style={styles.scoreRow}>
                    <Bold>{player.name}</Bold>
                    <Bold
                      style={{
                        backgroundColor: backgroundColors[pIndex],
                        padding: 5,
                      }}
                    >
                      {score}
                    </Bold>
                  </View>
                )
              })}
            </View>
          </View>
        )
      })}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalScoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameScoreRow: {
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    padding: 20,
    paddingTop: 10,
  },
  divider: {
    height: 2,
    flex: 1,
    backgroundColor: colors.BLACK,
    marginVertical: 20,
  },
})

export default view(History)
