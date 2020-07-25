import React from 'react'
import { View } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { useNavigation } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import { state, Player } from 'app/config/store'
import { Bold } from 'app/components'
import { getPlayerScore } from 'app/config/utils'
import Count from 'app/components/Count'
import BottomButton from '../player/components/BottomButton'

function Results() {
  const navigation = useNavigation()

  return (
    <>
      <Screen title="Results" hideBackButton>
        {state.game?.isOpen ? (
          <Bold>Waiting for other players...</Bold>
        ) : (
          state.game?.players.map((p: Player, index: number) => {
            const score = getPlayerScore(p.answers)

            return (
              <View key={index}>
                <Bold>{p.name}</Bold>
                <Count to={score} />
              </View>
            )
          })
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
export default view(Results)
