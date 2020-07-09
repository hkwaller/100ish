import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Screen from 'app/components/Screen'
import { getGame } from 'app/config/api'
import { state } from 'app/config/store'

type Props = {}

function WaitingRoom(props: Props) {
  useEffect(() => {
    getGame('69a2ed74-40f6-448e-a9a3-24a3123c4187')
    console.log(state.game)
  }, [])

  return (
    <Screen>
      <Text>WaitingRoom</Text>
      {/* {state.game} */}
    </Screen>
  )
}
export default WaitingRoom
