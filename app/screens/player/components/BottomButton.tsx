import React, { useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { colors } from 'app/config/constants'
import { Bold } from 'app/components'

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
    <Animated.View style={style}>
      <View
        style={{
          backgroundColor: colors.WHITE,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: colors.RED,
            padding: 20,
            flex: 1,
            alignItems: 'center',
            marginHorizontal: 66,
            marginTop: 20,
          }}
        >
          <Bold style={{ color: colors.WHITE, fontSize: 20 }}>{title}</Bold>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}
export default BottomButton
