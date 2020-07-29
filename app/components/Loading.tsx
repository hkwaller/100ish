import React from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { colors } from 'app/config/constants'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'

type Props = {
  color?: string
  value?: boolean
}

function Loading({ color = colors.WHITE, value = state.isLoading }) {
  const animation = useSharedValue(0)

  let interval = setInterval(() => {
    if (animation.value === 1) animation.value = 0
    else if (animation.value === 0) animation.value = 1
  }, 500)

  if (!value) {
    clearInterval(interval)
    interval = 0
  }

  const x = useDerivedValue(() => {
    return (animation.value + 1) * Math.random() * 20
  })

  const x2 = useDerivedValue(() => {
    return (animation.value + 1) * Math.random() * 20
  })

  const x3 = useDerivedValue(() => {
    return (animation.value + 1) * Math.random() * 20
  })

  const x4 = useDerivedValue(() => {
    return (animation.value + 1) * Math.random() * 20
  })

  const x1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -50 }],
      height: withSpring(x.value),
      translateY: 50,
    }
  })

  const x2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -50 }],
      height: withSpring(x2.value),
      translateY: 50,
    }
  })

  const x3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -50 }],
      height: withSpring(x3.value),
      translateY: 50,
    }
  })

  const x4Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -50 }],
      height: withSpring(x4.value),
      translateY: 50,
    }
  })

  const dots = [x1Style, x2Style, x3Style, x4Style]

  return (
    <View
      style={{
        margin: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
      }}
    >
      {dots.map((style, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              { width: 10, backgroundColor: color, marginLeft: 10 },
              style,
            ]}
          />
        )
      })}
    </View>
  )
}
export default view(Loading)
