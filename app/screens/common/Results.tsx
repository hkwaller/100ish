import React from 'react'
import { View, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import Slider from 'app/components/Slider'
import { state, Player } from 'app/config/store'
import { colors, screen } from 'app/config/constants'
import { Bold, PageHeader } from 'app/components'
import { getPlayerScore } from 'app/config/utils'
import Count from 'app/components/Count'
import BottomButton from '../player/components/BottomButton'

function Results() {
  const navigation = useNavigation()

  const p = state.game?.players.filter(p => p.name === state.player?.name)[0]

  return (
    <>
      <Screen title="Results" hideBackButton>
        {state.game?.isOpen ? (
          <Bold>Waiting for other players...</Bold>
        ) : (
          <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {state.game?.players.map((player: Player, index: number) => {
                const score = getPlayerScore(player.answers)

                return (
                  <View
                    key={index}
                    style={[
                      styles.scoreContainer,
                      {
                        marginLeft: index % 2 === 0 ? 0 : 12,
                        marginRight: index % 2 ? 12 : 0,
                      },
                    ]}
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
            <PageHeader style={{ marginBottom: 15 }}>Your scores</PageHeader>
            {p.answers.map((answer, index) => {
              const correctAnswer = state.game?.questions[index].answer || 0

              return (
                <View style={{ marginBottom: 20 }}>
                  <Bold style={{ marginBottom: 15 }}>
                    {state.game?.questions[index].title}
                  </Bold>
                  <View style={styles.descriptionContainer}>
                    <View style={styles.answerContainer}>
                      <Bold style={{ backgroundColor: colors.TURQUOISE }}>
                        Your answer
                      </Bold>
                      <Bold style={styles.correctAnswer}>Correct answer</Bold>
                    </View>
                    <Bold style={{ fontSize: 24 }}>
                      {Math.abs(answer - correctAnswer)}
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
          </>
        )}
      </Screen>
      <BottomButton
        onPress={() => {
          navigation.navigate('Home')
        }}
        title="Back to start"
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
})

export default view(Results)
