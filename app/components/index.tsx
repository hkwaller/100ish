import styled from 'styled-components/native'
import { fonts } from 'app/config/constants'
import Header from './Header'

export const HeaderText = styled.Text`
  font-family: ${fonts.REGULAR};
`

export const Bold = styled.Text`
  font-family: ${fonts.BOLD};
`

export const Regular = styled.Text`
  font-family: ${fonts.REGULAR};
`

export const Welcome = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 50px;
`

export { Header }
