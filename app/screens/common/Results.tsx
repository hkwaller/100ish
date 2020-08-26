import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { Bold, PageHeader } from 'app/components'
import Screen from 'app/components/Screen'
import Loading from 'app/components/Loading'
import { state, Player, Question } from 'app/config/store'
import { colors, screen } from 'app/config/constants'
import { getPlayerScore, getTranslatedTitle } from 'app/config/utils'
import BottomButton from '../player/components/BottomButton'
import { stopListening, getGame } from 'app/config/api'

const backgroundColors = [
  colors.TURQUOISE,
  colors.RED,
  colors.YELLOW,
  colors.LAVENDEL,
  colors.DARKGREY,
  colors.GREY,
]

function Results() {
  const navigation = useNavigation()
  const [width, setWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function stop() {
      await stopListening()
    }
    stop()
    ++state.timesPlayed
  }, [])

  useEffect(() => {
    if (!state.game?.isOpen) setIsLoading(false)
    else setIsLoading(true)
  }, [state.game?.isOpen])

  return (
    <>
      <Screen title="Results" hideBackButton>
        {isLoading ? (
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
        ) : (
          <View>
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
                      {player.answers.map((answer, playerAnswerIndex) => {
                        const untouchedScore = Math.abs(
                          state.game?.questions[playerAnswerIndex].answer -
                            answer
                        )

                        const scoreForQuestion = state.game?.capWrongAnswers
                          ? Math.min(untouchedScore, 25)
                          : untouchedScore === 0
                          ? -10
                          : untouchedScore

                        return (
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Bold>#{playerAnswerIndex + 1}</Bold>
                            <Bold style={{ fontSize: 18 }}>
                              {scoreForQuestion}
                            </Bold>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                )
              })}
            </View>
            <View style={{ marginVertical: 25 }} />
            <PageHeader>Details</PageHeader>
            {state.game?.questions.map(
              (question: Question, questionIndex: number) => {
                const correctAnswer = question.answer || 0

                return (
                  <View style={{ marginBottom: 20 }}>
                    <Bold style={{ marginTop: 15 }}>
                      {getTranslatedTitle(question).replace(/&quot;/g, '"')}
                    </Bold>
                    <View style={styles.answerContainer}>
                      {state.game?.players.map(
                        (p: Player, playerIndex: number) => {
                          return (
                            <Bold
                              style={[
                                styles.playerScoresText,
                                {
                                  backgroundColor:
                                    backgroundColors[playerIndex] ||
                                    colors.TURQUOISE,
                                },
                              ]}
                            >
                              {p.name} answer {p.answers[questionIndex]}
                            </Bold>
                          )
                        }
                      )}
                      <Bold style={{ backgroundColor: colors.GREEN }}>
                        Correct answer {correctAnswer}
                      </Bold>
                    </View>
                    <View style={styles.inlineScoreContainer}>
                      <View
                        style={styles.line}
                        onLayout={({
                          nativeEvent: {
                            layout: { width },
                          },
                        }) => {
                          setWidth(width)
                        }}
                      />
                      <View style={styles.circleContainer}>
                        {state.game?.players.map(
                          (player: Player, playerIndex: number) => {
                            const playerAnswer = player.answers[questionIndex]
                            const zIndex =
                              100 -
                                Math.abs(
                                  player.answers[questionIndex] - correctAnswer
                                ) || 0

                            return (
                              <View
                                style={[
                                  styles.answerCircle,
                                  {
                                    left:
                                      (width / 100) * (playerAnswer || 0) - 10,
                                    zIndex: zIndex,
                                    backgroundColor:
                                      backgroundColors[playerIndex],
                                  },
                                ]}
                              >
                                <Bold>{playerAnswer}</Bold>
                              </View>
                            )
                          }
                        )}
                        <View
                          style={[
                            styles.answerCircle,
                            {
                              backgroundColor: colors.GREEN,
                              left: (width / 100) * (correctAnswer || 0) - 10,
                            },
                          ]}
                        >
                          <Bold style={{ fontSize: 15 }}>{correctAnswer}</Bold>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }
            )}
          </View>
        )}
      </Screen>
      <BottomButton
        isVisible={!state.game?.isOpen}
        title="Back to start"
        onPress={async () => {
          await AsyncStorage.removeItem('@game')
          state.game = undefined
          navigation.navigate('Home', { checkForReview: true })
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
  inlineScoreContainer: {
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  answerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screen.WIDTH - 40,
  },
  answerCircle: {
    zIndex: 101,
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    top: -18,
    minWidth: 40,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 5,
    position: 'absolute',
    backgroundColor: colors.BLACK,
  },
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

export default view(Results)
