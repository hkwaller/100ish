import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Bold, SliderHeader } from 'app/components'
import { colors } from 'app/config/constants'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  delay,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

type Props = {
  number?: number
  updateVal?: (val: number) => void
  header?: string
  min?: number
  max?: number
  answer?: number
  defaultValue?: number
  setQuestionActiveCallback?: (isActive: boolean) => void
}

function clamp(x: number, min: number, max: number) {
  'worklet'
  if (x < min) return min
  else if (x > max) return max
  return x
}

const AnimatedBold = Animated.createAnimatedComponent(Bold)

function Slider({
  number,
  updateVal = () => {},
  header,
  max = 100,
  answer,
  defaultValue,
  setQuestionActiveCallback = () => {},
}: Props) {
  const [value, setValue] = useState(max / 2)

  const [isActive, setIsActive] = useState(false)
  const lineStart = useSharedValue(0)
  const lineEnd = useSharedValue(0)
  const numberY = useSharedValue(0)
  const text = useSharedValue(0)

  useEffect(() => {
    text.value = value
  }, [value])

  const x = useDerivedValue(() => {
    return defaultValue
      ? (lineEnd.value / 100) * defaultValue
      : lineEnd.value / 2 - 10
  })

  const answerX = useDerivedValue(() => {
    return (lineEnd.value / 100) * (answer || -1)
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value
      numberY.value = 1
      setIsActive(true)
      setQuestionActiveCallback(true)
    },
    onActive: (event, ctx) => {
      if (answer) return
      const val = ctx.startX + event.translationX
      const clamped = clamp(val, lineStart.value, lineEnd.value)
      const percentageValue = interpolate(
        clamped,
        [lineStart.value, lineEnd.value],
        [0, max]
      )

      if (Math.round(percentageValue) !== text.value) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      }

      setValue(Math.round(percentageValue))
      x.value = clamped
    },
    onEnd: _ => {
      const percentageValue = interpolate(
        x.value,
        [lineStart.value, lineEnd.value],
        [0, max]
      )
      updateVal(Math.round(percentageValue))
      setIsActive(false)
      numberY.value = 0
      setQuestionActiveCallback(false)
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

  const answerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: delay(100, withSpring(answerX.value)) }],
    }
  })

  return (
    <View style={styles.outerContainer}>
      {header && (
        <SliderHeader
          style={{
            marginBottom: 10,
            color: isActive ? colors.DARKGREY : colors.BLACK,
          }}
        >
          {header}
        </SliderHeader>
      )}
      <View style={styles.container}>
        {number && (
          <Bold style={{ flex: 1, fontSize: 25, marginRight: 20 }}>
            #{number}
          </Bold>
        )}
        <View style={styles.sliderContainer}>
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
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.circle, animatedStyle]}>
              <AnimatedBold style={textStyle}>
                {defaultValue || value}
              </AnimatedBold>
            </Animated.View>
          </PanGestureHandler>
          {answer && (
            <Animated.View
              style={[
                styles.circle,
                answerStyle,
                { backgroundColor: colors.GREEN },
              ]}
            >
              <AnimatedBold style={textStyle}>{answer}</AnimatedBold>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 30,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    justifyContent: 'center',
    flex: 5,
    alignItems: 'center',
  },
  line: {
    backgroundColor: colors.DARKGREY,
    height: 5,
    width: '100%',
    marginVertical: 15,
  },
  circleContainer: {
    padding: 20,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.TURQUOISE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Slider
