import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, screen } from 'app/config/constants'
import { Bold } from 'app/components'

function Logo() {
  return (
    <View style={styles.container}>
      <Bold style={{ fontSize: 40 }}>100ish</Bold>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  line: {
    height: 10,
    width: screen.WIDTH / 2.5,
    backgroundColor: colors.RED,
  },
})

export default Logo
