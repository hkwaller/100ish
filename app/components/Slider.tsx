import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Bold } from 'app/components'
import { colors, screen } from 'app/config/constants'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated'

type Props = {
  number: number
}

function clamp(x: number, min: number, max: number) {
  'worklet'
  if (x < min) return min
  else if (x > max) return max
  else return x
}

function Slider({ number }: Props) {
  const [value, setValue] = useState(50)
  const x = useSharedValue(100)
  const lineStart = useSharedValue(0)
  const lineEnd = useSharedValue(0)
  const numberY = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value
      numberY.value = -50
    },
    onActive: (event, ctx) => {
      const val = ctx.startX + event.translationX
      const clamped = clamp(val, lineStart.value, lineEnd.value)
      setValue(Math.round(clamped / 2.145 + 11))
      x.value = clamped
    },
    onEnd: _ => {
      numberY.value = 0
    },
  })

  const textScale = useDerivedValue(() => {
    return interpolate(numberY.value, [-30, 0], [1.5, 1])
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(numberY.value) },
        { scale: withSpring(textScale.value) },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <Bold style={{ flex: 1, fontSize: 40, marginRight: 20 }}>#{number}</Bold>
      <View
        style={{
          justifyContent: 'center',
          flex: 3,
          marginLeft: 20,
          overflow: 'visible',
        }}
      >
        <View
          style={styles.line}
          onLayout={({
            nativeEvent: {
              layout: { x, width },
            },
          }) => {
            lineStart.value = x - 25
            lineEnd.value = x + width - 25
          }}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.circle, animatedStyle]}>
            <Animated.View style={textStyle}>
              <Bold style={{ fontSize: 30 }}>{value}</Bold>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  line: {
    backgroundColor: colors.DARKGREY,
    height: 5,
    width: '100%',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Slider
