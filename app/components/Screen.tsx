import React from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native'
import Logo from './Logo'
import { colors } from 'app/config/constants'

type Props = {
  children?: React.ReactNode
  title?: string
  noPadding?: boolean
  hideBackButton?: boolean
}

function Screen({ children, title, noPadding, hideBackButton }: Props) {
  return (
    <>
      <View style={styles.top} />
      <View style={styles.container}>
        <Logo title={title} hideBackButton={hideBackButton} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[styles.innerContainer, { padding: noPadding ? 0 : 24 }]}
          >
            {children}
          </View>
        </ScrollView>
      </View>
      {Platform.OS === 'ios' && <SafeAreaView />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GREY,
  },
  top: {
    backgroundColor: colors.WHITE,
    paddingTop: Platform.OS === 'ios' ? 34 : 0,
  },
  innerContainer: {
    backgroundColor: colors.GREY,
    flex: 1,
  },
})

export default Screen
