import { Bold } from 'app/components'
import Loading from 'app/components/Loading'
import { colors } from 'app/config/constants'
import React from 'react'
import { View } from 'react-native'

function LoadingNewGame() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Bold style={{ marginBottom: 30 }}>Setting up new game...</Bold>
      <Loading color={colors.RED} value={true} />
    </View>
  )
}
export default LoadingNewGame
