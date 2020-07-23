import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { colors } from 'app/config/constants'
import { Bold } from 'app/components'

type Props = {
  onPress: () => void
  title: string
}

function BottomButton({ onPress, title }: Props) {
  return (
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
  )
}
export default BottomButton
