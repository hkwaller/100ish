import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import 'react-native-gesture-handler'

import Front from 'app/screens/Front'
import StartGame from 'app/screens/player/StartGame'
import Lounge from 'app/screens/player/Lounge'
import Respond from 'app/screens/player/Respond'

import Setup from 'app/screens/leader/Setup'
import Game from 'app/screens/leader/Game'
import WaitingRoom from 'app/screens/leader/WaitingRoom'
import Results from 'app/screens/common/Results'

import AddQuestion from 'app/screens/add-question/AddQuestion'
import { state } from 'app/config/store'

require('react-native').unstable_enableLogBox()

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

function App() {
  React.useEffect(() => {
    async function getPlayerFromStorage() {
      const player = await AsyncStorage.getItem('@player')
      if (player) state.player = JSON.parse(player)
    }

    getPlayerFromStorage()
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
