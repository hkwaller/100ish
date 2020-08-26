import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import 'react-native-gesture-handler'
import { YellowBox } from 'react-native'

import Front from 'app/screens/Front'
import StartGame from 'app/screens/player/StartGame'
import Lounge from 'app/screens/player/Lounge'
import Respond from 'app/screens/player/Respond'

import Setup from 'app/screens/leader/Setup'
import Game from 'app/screens/leader/Game'
import WaitingRoom from 'app/screens/leader/WaitingRoom'
import Results from 'app/screens/common/Results'

import AddQuestion from 'app/screens/add-question/AddQuestion'
import Settings from 'app/screens/settings/Settings'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'
import { setupPurchases } from 'app/config/utils'

require('react-native').unstable_enableLogBox()
YellowBox.ignoreWarnings(['Setting a timer'])
const Stack = createStackNavigator()

function PlayerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartGame" component={StartGame} />
      <Stack.Screen name="Lounge" component={Lounge} />
      <Stack.Screen name="Respond" component={Respond} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  )
}

function GameLeaderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="ResultsWaitingRoom" component={WaitingRoom} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  )
}

function AddQuestionAstack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddQuestion" component={AddQuestion} />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

function App() {
  React.useEffect(() => {
    async function getDataFromStorage() {
      try {
        const player = (await AsyncStorage.getItem('@player')) || '{}'
        const timesPlayed = (await AsyncStorage.getItem('@timesPlayed')) || '0'
        const selectedLanguage =
          (await AsyncStorage.getItem('@selectedLanguage')) || '0'
        const hasPurchased =
          (await AsyncStorage.getItem('@hasPurchased')) || 'false'
        const hasSeenIntro =
          (await AsyncStorage.getItem('@hasSeenIntro')) || 'false'
        const game = await AsyncStorage.getItem('@game')

        state.player = JSON.parse(player)
        state.timesPlayed = JSON.parse(timesPlayed)
        state.selectedLanguage = JSON.parse(selectedLanguage)
        state.hasPurchased = __DEV__ ? true : JSON.parse(hasPurchased)
        state.hasSeenIntro = JSON.parse(hasSeenIntro)
        if (game) {
          state.game = JSON.parse(game)
        }
        if (!state.hasPurchased) {
          await setupPurchases()
        }
      } catch (e) {
        console.log('e: ', e)
      }
    }

    getDataFromStorage()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Front} />
        <Stack.Screen name="Respond" component={PlayerStack} />
        <Stack.Screen name="Leader" component={GameLeaderStack} />
        <Stack.Screen name="Add" component={AddQuestionAstack} />
        <Stack.Screen name="Settings" component={SettingsStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default view(App)
