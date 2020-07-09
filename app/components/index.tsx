import styled from 'styled-components/native'
import { fonts, colors } from 'app/config/constants'
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

export const QuestionText = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 30px;
  color: ${colors.WHITE};
`

export const PageHeader = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 30px;
  margin-bottom: 20px;
`

export const Welcome = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 50px;
`

export const SliderHeader = styled.Text`
  font-family: ${fonts.BOLD};
  font-size: 30px;
  color: ${colors.DARKGREY};
`

export { Header }
