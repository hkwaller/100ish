import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation, StackActions } from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage'

import { Bold, PageHeader } from 'app/components'
import Screen from 'app/components/Screen'
import { state, Player, Question } from 'app/config/store'
import { colors, screen } from 'app/config/constants'
import { getTranslatedTitle, isGameLeader } from 'app/config/utils'
import BottomButton from '../player/components/BottomButton'
import { getNewGame, stopListening } from 'app/config/api'
import WaitingForPlayers from './WaitingForPlayers'
import ResultsButton from './ResultsButton'
import TotalScores from './TotalScores'
import LoadingNewGame from './LoadingNewGame'

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
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    state.history = [...state.history, state.game]

    async function stop() {
      await stopListening()
    }
    stop()
    ++state.timesPlayed
  }, [])

  useEffect(() => {
    if (state.game?.newGameName && !hasNavigated) {
      setHasNavigated(false)
      const popAction = StackActions.pop(isGameLeader() ? 3 : 2)
      navigation.dispatch(popAction)
    }
  }, [state.game])

  useEffect(() => {
    if (!state.game?.isOpen) {
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 0.9,
        },
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 0.9,
        },
      })
      setIsLoading(false)
    } else setIsLoading(true)
  }, [state.game?.isOpen])

  return (
    <>
      <Screen title="Results" hideBackButton>
        {state.game?.newGameName ? (
          <LoadingNewGame />
        ) : isLoading ? (
          <WaitingForPlayers />
        ) : (
          <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <TotalScores />
              {isGameLeader() && (
                <ResultsButton
                  title="Play again"
                  backgroundColor={colors.SLATE}
                  style={{ marginRight: 10 }}
                  onPress={async () => {
                    if (isGameLeader()) {
                      await getNewGame()
                    }
                  }}
                />
              )}
              {state.history.length > 0 && isGameLeader() && (
                <ResultsButton
                  title="Total scores"
                  backgroundColor={colors.RED}
                  onPress={() => {
                    navigation.navigate('MyModal')
                  }}
                />
              )}
            </View>
            <View style={{ marginVertical: 25 }} />
            <PageHeader>Details</PageHeader>
            {state.game?.questions.map(
              (question: Question, questionIndex: number) => {
                const correctAnswer = question.answer || 0

                return (
                  <View style={{ marginBottom: 20 }} key={questionIndex}>
                    <Bold style={{ marginTop: 15 }}>
                      {getTranslatedTitle(question).replace(/&quot;/g, '"')}
                    </Bold>
                    <View style={styles.answerContainer}>
                      {state.game?.players.map(
                        (p: Player, playerIndex: number) => {
                          return (
                            <Bold
                              key={playerIndex}
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
                                key={playerIndex}
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
