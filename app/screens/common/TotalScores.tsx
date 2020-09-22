import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Bold, PageHeader } from 'app/components'
import { colors, screen } from 'app/config/constants'
import { Player, state } from 'app/config/store'
import { getPlayerScore } from 'app/config/utils'

function TotalScores() {
  return (
    <>
      <PageHeader style={{ marginBottom: 15 }}>Player scores</PageHeader>

      {state.game?.players.map((player: Player, index: number) => {
        const score = getPlayerScore(player.answers)
        const marginVal = index % 2 === 0
        const margins = {
          marginLeft: marginVal ? 0 : 12,
          marginRight: marginVal ? 12 : 0,
        }

        return (
          <View key={index}>
            <View style={[styles.scoreContainer, { ...margins }]}>
              <Bold style={{ fontSize: 14, marginTop: 10 }}>
                {player.name || 'Unknown'}
              </Bold>
              <Bold style={{ fontSize: 24 }}>{score}</Bold>
            </View>
            <View
              style={{
                backgroundColor: colors.WHITE,
                padding: 10,
                ...margins,
              }}
            >
              {player.answers.map(
                (answer: number, playerAnswerIndex: number) => {
                  const untouchedScore = Math.abs(
                    (state.game?.questions[playerAnswerIndex].answer || 0) -
                      answer
                  )

                  const scoreForQuestion = state.game?.capWrongAnswers
                    ? Math.min(untouchedScore, 25)
                    : untouchedScore === 0
                    ? -10
                    : untouchedScore

                  return (
                    <View
                      key={playerAnswerIndex}
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Bold>#{playerAnswerIndex + 1}</Bold>
                      <Bold style={{ fontSize: 18 }}>{scoreForQuestion}</Bold>
                    </View>
                  )
                }
              )}
            </View>
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screen.WIDTH / 2 - 48,
    backgroundColor: colors.WHITE,
    padding: 10,
    paddingBottom: 15,
  },
})
export default TotalScores
