import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { state } from 'app/config/store'
import { Bold } from 'app/components'
import { colors } from 'app/config/constants'
import AsyncStorage from '@react-native-community/async-storage'

const languages = [
  { name: 'en', flag: '🇬🇧' },
  { name: 'sv', flag: '🇸🇪' },
  { name: 'no', flag: '🇳🇴' },
]

function Languages() {
  const [width, setWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(
    languages.map(l => l.name).indexOf(state.selectedLanguage)
  )

  const left = useSharedValue(0)

  useEffect(() => {
    left.value = (width / 3) * activeIndex + 10
  }, [activeIndex, width])

  const lineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(left.value) }],
    }
  })

  return (
    <>
      <Bold style={styles.header}>Language</Bold>
      <View style={{ alignItems: 'flex-start' }}>
        <View
          style={styles.outerContainer}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setWidth(width)
          }}
        >
          <Animated.View style={[styles.line, lineStyle]} />
          {languages.map(({ name, flag }, index) => {
            return (
              <Language
                key={index}
                flag={flag}
                onPress={() => {
                  state.selectedLanguage = name
                  AsyncStorage.setItem(
                    '@selectedLanguage',
                    JSON.stringify(state.selectedLanguage)
                  )
                  setActiveIndex(index)
                }}
              />
            )
          })}
        </View>
      </View>
    </>
  )
}

type LanguageProps = {
  flag: string
  onPress: () => void
}

function Language({ flag, onPress }: LanguageProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.languageContainer}>
      <Text style={styles.languageText}>{flag}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: { marginLeft: 10, fontSize: 24, marginTop: 20 },
  outerContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  languageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  languageText: {
    fontSize: 40,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    width: 65,
    height: 65,
    backgroundColor: colors.GREEN,
  },
})

export default Languages
