import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'

import Front from 'app/screens/Front'
import Start from 'app/screens/respond/Start'
import Answers from 'app/screens/respond/Answers'
import Finished from 'app/screens/respond/Finished'

import Setup from 'app/screens/leader/Setup'
import Game from 'app/screens/leader/Game'
import WaitingRoom from 'app/screens/leader/WaitingRoom'
import Results from 'app/screens/leader/Results'
require('react-native').unstable_enableLogBox()

const Stack = createStackNavigator()

function RespondStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Answers" component={Answers} />
      <Stack.Screen name="Finished" component={Finished} />
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
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Front} />
        <Stack.Screen name="Respond" component={RespondStack} />
        <Stack.Screen name="Leader" component={GameLeaderStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
