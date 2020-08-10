import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'
import AsyncStorage from '@react-native-community/async-storage'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { view } from '@risingstack/react-easy-state'

import { screen, colors } from 'app/config/constants'
import { PageHeader, Bold } from '.'
import { state } from 'app/config/store'

const imgOne = require('../../assets/1.png')
const imgTwo = require('../../assets/2.png')
const imgThree = require('../../assets/3.png')
const imgFour = require('../../assets/4.png')

const slides = [
  {
    title:
      'Firstly, select a game master who will be running the game. This person taps the big purple button.',
    image: imgOne,
  },
  {
    title:
      "After that, he/she/it reads out the game room name to the other players. Here it's Proud Dragons Accept.",
    image: imgFour,
  },
  {
    title:
      'The game master reads out the questions and lets the others respond. And, if the game master elected to be part of the game, responds themselves.',
    image: imgTwo,
  },
  {
    title: 'When everyone is finished, find out the scores and see who wins.',
    image: imgThree,
  },
]
const initialHeight = screen.HEIGHT + 50

function Intro() {
  const translateY = useSharedValue(initialHeight)

  useEffect(() => {
    if (!state.hasSeenIntro) translateY.value = 0
    else translateY.value = initialHeight
  }, [state.hasSeenIntro])

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(translateY.value, { damping: 15 }) },
      ],
    }
  })

  return (
    <Animated.View style={[style, styles.outerContainer]}>
      <TapGestureHandler
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            state.hasSeenIntro = true
          }
        }}
      >
        <Animated.View style={styles.fillObject} />
      </TapGestureHandler>
      <View style={[styles.container]}>
        <PageHeader style={{ marginTop: 40 }}>Welcome to 100ish!</PageHeader>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            paddingTop: 40,
            width: (screen.WIDTH - 40) * slides.length,
          }}
        >
          {slides.map((slide, index) => {
            return (
              <View
                key={index}
                style={{
                  width: screen.WIDTH - 40,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Bold
                  style={{
                    marginBottom: 40,
                    marginHorizontal: 40,
                    textAlign: 'center',
                  }}
                >
                  {slide.title}
                </Bold>
                <Image
                  source={slide.image}
                  style={{
                    height: screen.WIDTH - 100,
                    width: screen.WIDTH - 100,
                  }}
                  resizeMode="contain"
                />
              </View>
            )
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.setItem('@hasSeenIntro', 'true')
            state.hasSeenIntro = true
          }}
        >
          <Bold>I know all this, show me the app!</Bold>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    height: screen.HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    width: screen.WIDTH,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fillObject: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.BLACK,
    opacity: 0.8,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: colors.GREEN,
    marginTop: 60,
    borderRadius: 30,
    marginBottom: 40,
  },
})
export default view(Intro)
