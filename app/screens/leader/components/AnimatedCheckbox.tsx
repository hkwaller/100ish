import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { PageHeader } from 'app/components'
import { state } from 'app/config/store'
import { colors } from 'app/config/constants'
import { view } from '@risingstack/react-easy-state'

function AnimatedCheckbox() {
  const translateY = useSharedValue(-50)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    }
  })

  useEffect(() => {
    if (state.isPlaying) translateY.value = 0
    else translateY.value = -50
  }, [state.isPlaying])

  return (
    <TouchableOpacity
      style={[styles.isPlaying]}
      onPress={() => (state.isPlaying = !state.isPlaying)}
    >
      <View style={styles.checkbox}>
        <Animated.View
          style={[
            style,
            {
              padding: 24,
              backgroundColor: colors.GREEN,
            },
          ]}
        />
      </View>
      <PageHeader>I wanna play to!</PageHeader>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  isPlaying: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    flexDirection: 'row',
  },
  checkbox: {
    overflow: 'hidden',
  },
})

export default view(AnimatedCheckbox)
