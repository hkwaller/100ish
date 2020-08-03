import React, { useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { colors } from 'app/config/constants'
import { Bold } from 'app/components'
import { view } from '@risingstack/react-easy-state'
import { state } from 'app/config/store'
import Loading from 'app/components/Loading'

type Props = {
  onPress: () => void
  title: string
  isVisible?: boolean
}

function BottomButton({ onPress, title, isVisible = true }: Props) {
  const animation = useSharedValue(120)

  useEffect(() => {
    if (isVisible) animation.value = 0
    else animation.value = 120
  }, [isVisible])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(animation.value, { damping: 15 }) }],
    }
  })

  return (
    <Animated.View style={[style, styles.container]}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: !state.isLoading ? colors.RED : colors.DARKGREY,
          },
        ]}
        onPress={() => {
          if (state.isLoading) return
          onPress()
        }}
      >
        <Bold style={styles.text}>
          {state.isLoading ? 'Loading...' : title}
        </Bold>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    height: 65,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 66,
    marginTop: 20,
  },
  text: { color: colors.WHITE, fontSize: 20 },
})

export default view(BottomButton)
