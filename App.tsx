import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'

import Front from 'app/screens/Front'
import Start from 'app/screens/respond/Start'
import Answers from 'app/screens/respond/Answers'
import Finished from 'app/screens/respond/Finished'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
