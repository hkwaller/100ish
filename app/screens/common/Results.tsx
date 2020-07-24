import React from 'react'
import { view } from '@risingstack/react-easy-state'
import { useNavigation, StackActions } from '@react-navigation/native'

import Screen from 'app/components/Screen'
import { state, Player } from 'app/config/store'
import { Bold, PageHeader } from 'app/components'
import { getPlayerScore } from 'app/config/utils'
import Count from 'app/components/Count'
import BottomButton from '../player/components/BottomButton'

function Results() {
  const navigation = useNavigation()

  return (
    <>
      <Screen>
        <PageHeader style={{ marginBottom: 20 }}>Results</PageHeader>
        {state.game?.isOpen ? (
          <Bold>Waiting for other players...</Bold>
        ) : (
          state.game?.players.map((p: Player) => {
            const score = getPlayerScore(p.answers)

            return (
              <>
                <Bold>{p.name}</Bold>
                <Count to={score} />
              </>
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
