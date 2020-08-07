import React, { useEffect } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Svg, Circle } from 'react-native-svg'
import { view } from '@risingstack/react-easy-state'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { Bold } from 'app/components'
import { colors, screen } from 'app/config/constants'

type Props = {
  name: string
  isFinished: boolean
  toggle?: () => void
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

function Player({ name, isFinished, toggle }: Props) {
  const anim = useSharedValue(0)

  useEffect(() => {
    anim.value = isFinished ? 1 : 0
  }, [isFinished])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(anim.value) }],
    }
  })

  return (
    <TouchableWithoutFeedback onPress={() => toggle && toggle()}>
      <View style={styles.container}>
        <Bold style={{ marginRight: 15 }}>{name}</Bold>
        <View>
          <AnimatedSvg
            height="40"
            width="40"
            style={[{ ...StyleSheet.absoluteFillObject }, style]}
            viewBox="0 0 40 40"
          >
            <Circle cx={20} cy={20} r="10" fill={colors.GREEN} />
          </AnimatedSvg>
          <Svg height="40" width="40" viewBox="0 0 40 40">
            <Circle
              cx="20"
              cy="20"
              r="10"
              stroke={colors.BLACK}
              strokeWidth="6"
              fill="transparent"
            />
          </Svg>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: screen.WIDTH / 2 - 35,
  },
})

export default view(Player)
