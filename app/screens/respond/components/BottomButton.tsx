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
    <SafeAreaView
      style={{
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 66,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.RED,
          padding: 20,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Bold style={{ color: colors.WHITE, fontSize: 20 }}>{title}</Bold>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default BottomButton
