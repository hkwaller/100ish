import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Logo from 'app/components/Logo'
import { colors } from 'app/config/constants'
import { Welcome } from 'app/components'
import BigButton from 'app/components/BigButton'
import { useNavigation } from '@react-navigation/native'

function Front() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={{ backgroundColor: colors.GREY, flex: 1, padding: 40 }}>
        <Welcome style={{ marginBottom: 20 }}>Welcome</Welcome>
        <BigButton
          title="I’m the game master"
          onPress={() => {}}
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
      </View>
    </SafeAreaView>
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
