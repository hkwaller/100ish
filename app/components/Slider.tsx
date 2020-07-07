import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Bold } from 'app/components'
import { colors } from 'app/config/constants'
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
  response?: number
  updateVal: (val: number) => void
}

function clamp(x: number, min: number, max: number) {
  'worklet'
  if (x < min) return min
  else if (x > max) return max
  else return x
}

const AnimatedBold = Animated.createAnimatedComponent(Bold)

function Slider({ number, response = -1, updateVal = () => {} }: Props) {
  const [value, setValue] = useState(50)
  const lineStart = useSharedValue(0)
  const lineEnd = useSharedValue(0)
  const numberY = useSharedValue(0)

  const x = useDerivedValue(() => {
    return lineEnd.value / 2 - 10
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value
      numberY.value = 1
    },
    onActive: (event, ctx) => {
      const val = ctx.startX + event.translationX
      const clamped = clamp(val, lineStart.value, lineEnd.value)
      const percentageValue = interpolate(
        clamped,
        [lineStart.value, lineEnd.value],
        [0, 100]
      )
      setValue(Math.floor(percentageValue))
      x.value = clamped
    },
    onEnd: _ => {
      const clamped = clamp(x.value, lineStart.value, lineEnd.value)
      const percentageValue = interpolate(
        clamped,
        [lineStart.value, lineEnd.value],
        [0, 100]
      )
      updateVal(Math.floor(percentageValue))

      numberY.value = 0
    },
  })

  const textScale = useDerivedValue(() => {
    return interpolate(numberY.value, [0, 1], [20, 35])
  })

  const circleScale = useDerivedValue(() => {
    return interpolate(numberY.value, [0, 1], [1, 1.2])
  })

  const translateY = useDerivedValue(() => {
    return interpolate(numberY.value, [0, 1], [0, -50])
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(x.value) },
        { scale: withSpring(circleScale.value) },
      ],
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
      fontSize: withSpring(textScale.value),
      width: 100,
      textAlign: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <Bold style={{ flex: 1, fontSize: 40 }}>#{number}</Bold>
      <View
        style={{
          justifyContent: 'center',
          flex: 3,
          marginLeft: 20,
        }}
      >
        <View
          style={styles.line}
          onLayout={({
            nativeEvent: {
              layout: { x, width },
            },
          }) => {
            lineStart.value = x - 15
            lineEnd.value = x + width - 15
          }}
        />
        {response !== -1 && (
          <View
            style={[
              styles.circle,
              { left: response, backgroundColor: colors.GREEN },
            ]}
          >
            <Bold>{response}</Bold>
          </View>
        )}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.circle, animatedStyle]}>
            <AnimatedBold style={textStyle}>{value}</AnimatedBold>
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
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  line: {
    backgroundColor: colors.DARKGREY,
    height: 5,
    width: '90%',
  },
  circleContainer: {
    padding: 20,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    top: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.TURQUOISE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Slider
