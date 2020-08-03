import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { fonts, colors, screen } from 'app/config/constants'

type Props = {
  title: string
  onPress: () => void
  bgColor: string
  color?: string
}

export const SmallButtonText = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 14px;
`

function SmallButton({ title, onPress, bgColor, color }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <SmallButtonText style={{ color: color || colors.WHITE }}>
        {title}
      </SmallButtonText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
    maxWidth: screen.WIDTH / 2 - 40,
    marginHorizontal: 10,
  },
})

export default SmallButton
