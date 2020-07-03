import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Logo from 'app/components/Logo'
import { colors } from 'app/config/constants'
import Slider from 'app/components/Slider'

type Props = {}

function Start(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={{ backgroundColor: colors.GREY, flex: 1, padding: 40 }}>
        <Slider number={1} />
        <Slider number={2} />
        <Slider number={3} />
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

export default Start
