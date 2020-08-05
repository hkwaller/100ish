import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import * as InAppPurchases from 'expo-in-app-purchases'
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
import Settings from 'app/screens/settings/Settings'
import { state } from 'app/config/store'
import { view } from '@risingstack/react-easy-state'

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
      const player = (await AsyncStorage.getItem('@player')) || '{}'
      const timesPlayed = (await AsyncStorage.getItem('@timesPlayed')) || '0'
      const selectedLanguage =
        (await AsyncStorage.getItem('@selectedLanguage')) || '0'
      const hasPurchased =
        (await AsyncStorage.getItem('@hasPurchased')) || 'false'

      state.player = JSON.parse(player)
      state.timesPlayed = JSON.parse(timesPlayed)
      state.selectedLanguage = JSON.parse(selectedLanguage)
      state.hasPurchased = JSON.parse(hasPurchased)

      console.log('hasPurchased: ', hasPurchased)
      if (hasPurchased) {
        const history = await InAppPurchases.connectAsync()
        if (history.responseCode === InAppPurchases.IAPResponseCode.OK) {
          history.results.forEach(result => {
            console.log('result: ', result)
            state.hasPurchased = true
          })
        } else {
          console.log('shit failed yo')
        }

        await InAppPurchases.getProductsAsync(['premium'])

        InAppPurchases.setPurchaseListener(
          ({ responseCode, results, errorCode }) => {
            if (responseCode === InAppPurchases.IAPResponseCode.OK) {
              results.forEach(purchase => {
                if (!purchase.acknowledged) {
                  state.hasPurchased = true
                  AsyncStorage.setItem('@hasPurchased', JSON.stringify(true))
                  InAppPurchases.finishTransactionAsync(purchase, true)
                }
              })
            }

            if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
              console.log('User canceled the transaction')
            } else if (
              responseCode === InAppPurchases.IAPResponseCode.DEFERRED
            ) {
              console.log(
                'User does not have permissions to buy but requested parental approval (iOS only)'
              )
            } else {
              console.warn(
                `Something went wrong with the purchase. Received errorCode ${errorCode}`
              )
            }
          }
        )
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
