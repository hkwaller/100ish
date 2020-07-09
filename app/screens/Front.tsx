import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from 'app/config/constants'
import { Welcome } from 'app/components'
import BigButton from 'app/components/BigButton'
import { useNavigation } from '@react-navigation/native'
import Screen from 'app/components/Screen'

function Front() {
  const navigation = useNavigation()

  return (
    <Screen>
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
        title="I want to add a question or two"
        onPress={() => {}}
        bgColor={colors.RED}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
})

export default Front
