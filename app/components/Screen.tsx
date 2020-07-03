import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Logo from './Logo'
import { colors } from 'app/config/constants'

type Props = {
  children: React.ReactNode
}

function Screen({ children }: Props) {
  return (
    <>
      <View style={styles.top} />
      <View style={styles.container}>
        <Logo />
        <ScrollView>
          <View style={styles.innerContainer}>{children}</View>
        </ScrollView>
      </View>
      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GREY,
  },
  top: { backgroundColor: colors.WHITE, paddingTop: 34 },
  innerContainer: { backgroundColor: colors.GREY, flex: 1, padding: 24 },
})

export default Screen
