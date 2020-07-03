import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './Logo'
import { colors } from 'app/config/constants'
import { useNavigation } from '@react-navigation/native'

type Props = {
  children: React.ReactNode
}

function Screen({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={styles.innerContainer}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  innerContainer: { backgroundColor: colors.GREY, flex: 1, padding: 24 },
})

export default Screen
