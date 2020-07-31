import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'

import { PageHeader } from 'app/components'
import { colors } from 'app/config/constants'
import { view } from '@risingstack/react-easy-state'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

type Props = {
  title: string
  toggle: () => void
  val: boolean
}

const AnimatedPageHeader = Animated.createAnimatedComponent(PageHeader)

function AnimatedCheckbox({ title, toggle, val }: Props) {
  const translateY = useSharedValue(-50)
  const textScale = useSharedValue(1)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: _ => {
      textScale.value = 0.8
    },
    onEnd: _ => {
      textScale.value = 1
    },
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -140 },
        { scale: withSpring(textScale.value) },
        { translateX: 140 },
      ],
    }
  })

  useEffect(() => {
    if (val) translateY.value = 0
    else translateY.value = -50
  }, [val])

  return (
    <TapGestureHandler
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END) toggle()
        onGestureEvent
      }}
      onGestureEvent={onGestureEvent}
    >
      <Animated.View style={[styles.animatedCheckbox]}>
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
        <AnimatedPageHeader style={[{ flex: 3 }, textStyle]}>
          {title}
        </AnimatedPageHeader>
      </Animated.View>
    </TapGestureHandler>
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
