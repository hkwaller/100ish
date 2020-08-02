import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import { state, Player } from 'app/config/store'
import { colors, screen } from 'app/config/constants'
import { Bold, PageHeader } from 'app/components'
import { getPlayerScore, getTranslatedTitle } from 'app/config/utils'
import Count from 'app/components/Count'
import BottomButton from '../player/components/BottomButton'
import { stopListening } from 'app/config/api'
import Loading from 'app/components/Loading'

function Results() {
  const navigation = useNavigation()

  const scoresForPlayers = state.game?.showAllScores
    ? state.game.players.sort((a, b) => {
        if (a.name === state.player?.name) return -1
        else if (b.name === state.player?.name) return 1
        else return 0
      })
    : state.game?.players.filter(p => p.name === state.player?.name) || []

  useEffect(() => {
    stopListening()
  })

  return (
    <>
      <Screen title="Results" hideBackButton>
        {state.game?.isOpen ? (
          <View style={styles.waiting}>
            <Bold style={styles.waitingText}>Waiting for other players...</Bold>
            <Loading color={colors.RED} value={state.game.isOpen} />
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <PageHeader style={{ marginBottom: 15 }}>
                Player scores
              </PageHeader>

              {state.game?.players.map((player: Player, index: number) => {
                const score = getPlayerScore(player.answers)
                const marginVal = index % 2 === 0
                const margins = {
                  marginLeft: marginVal ? 0 : 12,
                  marginRight: marginVal ? 12 : 0,
                }

                return (
                  <View
                    key={index}
                    style={[styles.scoreContainer, { ...margins }]}
                  >
                    <Bold style={{ fontSize: 14, marginTop: 10 }}>
                      {player.name}
                    </Bold>
                    <Count to={score} />
                  </View>
                )
              })}
            </View>
            <View style={{ marginVertical: 25 }} />
            {scoresForPlayers.map(p => {
              const header =
                p.name === state.player?.name ? 'Your' : `${p.name}s`

              return (
                <View style={{ marginVertical: 20 }}>
                  <PageHeader style={{ marginBottom: 15 }}>
                    {header} scores
                  </PageHeader>
                  {p.answers.map((answer, index) => {
                    const correctAnswer =
                      state.game?.questions[index].answer || 0

                    return (
                      <View key={index}>
                        <Bold style={{ marginBottom: 15 }}>
                          {getTranslatedTitle(state.game?.questions[index])}
                        </Bold>
                        <View style={styles.descriptionContainer}>
                          <View style={styles.answerContainer}>
                            <Bold style={{ backgroundColor: colors.TURQUOISE }}>
                              Your answer
                            </Bold>
                            <Bold style={styles.correctAnswer}>
                              Correct answer
                            </Bold>
                          </View>
                          <Bold style={{ fontSize: 24 }}>
                            {answer === correctAnswer
                              ? '-10'
                              : Math.abs(answer - correctAnswer)}
                          </Bold>
                        </View>
                        <Slider
                          key={index}
                          defaultValue={answer}
                          number={index + 1}
                          answer={state.game?.questions[index].answer}
                        />
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </>
        )}
      </Screen>
      <BottomButton
        isVisible={!state.game?.isOpen}
        title="Back to start"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
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
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswer: {
    backgroundColor: colors.GREEN,
    marginLeft: 10,
  },
  waiting: {
    padding: 20,
    alignItems: 'center',
  },
  waitingText: { marginBottom: 40, fontSize: 20, textAlign: 'center' },
})

export default view(Results)
