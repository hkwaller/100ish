import React from 'react'
import Slider from 'app/components/Slider'
import Screen from 'app/components/Screen'

function Start() {
  return (
    <Screen>
      <Slider number={1} />
      <Slider number={2} />
      <Slider number={3} />
    </Screen>
  )
}

export default Start
