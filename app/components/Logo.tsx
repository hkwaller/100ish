import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'app/config/constants'
import { Bold } from 'app/components'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  title?: string
  hideBackButton?: boolean
}

function Logo({ title, hideBackButton = false }: Props) {
  const [width, setWidth] = useState(0)

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View>
        <Bold
          onLayout={({
            nativeEvent: {
              layout: { width: layoutWidth },
            },
          }) => {
            setWidth(layoutWidth)
          }}
          style={{ fontSize: 40 }}
        >
          {title || '100ish'}
        </Bold>
        <View style={[styles.line, { width: width }]} />
      </View>
      {navigation.canGoBack() && !hideBackButton && (
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
    backgroundColor: colors.RED,
  },
})

export default Logo
