import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, screen } from 'app/config/constants'
import { Bold } from 'app/components'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Logo() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View>
        <Bold style={{ fontSize: 40 }}>100ish</Bold>
        <View style={styles.line} />
      </View>
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Bold style={{ color: colors.RED, fontSize: 20 }}>Back</Bold>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  line: {
    height: 10,
    width: screen.WIDTH / 2.5,
    backgroundColor: colors.RED,
  },
})

export default Logo
