import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { fonts, colors } from 'app/config/constants'

type Props = {
  title: string
  onPress: () => void
  bgColor: string
  color?: string
}

export const BigButtonText = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 30px;
`

function BigButton({ title, onPress, bgColor, color = colors.WHITE }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <BigButtonText style={{ color: color }}>{title}</BigButtonText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
})

export default BigButton
