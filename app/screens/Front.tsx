import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as StoreReview from 'expo-store-review'

import { colors } from 'app/config/constants'
import { Welcome } from 'app/components'
import BigButton from 'app/components/BigButton'
import Screen from 'app/components/Screen'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'

function Front() {
  const navigation = useNavigation()

  setTimeout(() => {
    if (state.timesPlayed > 0 && state.timesPlayed % 5 === 0) {
      StoreReview.requestReview()
    }
  }, 1000)

  return (
    <Screen hideBackButton>
      <Welcome style={{ marginBottom: 20 }}>Welcome</Welcome>
      <BigButton
        title="I’m the game master"
        onPress={() => navigation.navigate('Leader')}
        bgColor={colors.PURPLE}
      />
      <BigButton
        title="I’m participating"
        onPress={() => navigation.navigate('Respond')}
        bgColor={colors.GREEN}
      />
      <BigButton
        title="Add question"
        onPress={() => navigation.navigate('Add')}
        bgColor={colors.RED}
      />
      <BigButton
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        bgColor={colors.LAVENDEL}
        color={colors.BLACK}
      />
    </Screen>
  )
}

export default view(Front)
