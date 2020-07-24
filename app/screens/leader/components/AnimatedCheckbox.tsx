import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { PageHeader } from 'app/components'
import { colors } from 'app/config/constants'
import { view } from '@risingstack/react-easy-state'

type Props = {
  title: string
  toggle: () => void
  val: boolean
}

function AnimatedCheckbox({ title, toggle, val }: Props) {
  const translateY = useSharedValue(-50)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    }
  })

  useEffect(() => {
    if (val) translateY.value = 0
    else translateY.value = -50
  }, [val])

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.animatedCheckbox]}
      onPress={toggle}
    >
      <View style={styles.checkbox}>
        <Animated.View
          style={[
            style,
            {
              padding: 12,
              backgroundColor: colors.GREEN,
            },
          ]}
        />
      </View>
      <PageHeader style={{ flex: 3 }}>{title}</PageHeader>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  animatedCheckbox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 12,
    flexDirection: 'row',
  },
  checkbox: {
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: colors.BLACK,
    flex: 0,
    marginRight: 20,
  },
})

export default view(AnimatedCheckbox)
