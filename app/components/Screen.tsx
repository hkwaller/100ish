import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Logo from './Logo'
import { colors } from 'app/config/constants'

type Props = {
  children: React.ReactNode
  noPadding?: boolean
}

function Screen({ children, noPadding }: Props) {
  return (
    <>
      <View style={styles.top} />
      <View style={styles.container}>
        <Logo />
        <ScrollView>
          <View
            style={[
              styles.innerContainer,
              {
                padding: noPadding ? 0 : 24,
              },
            ]}
          >
            {children}
          </View>
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
  innerContainer: {
    backgroundColor: colors.GREY,
    flex: 1,
  },
})

export default Screen
