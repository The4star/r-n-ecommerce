import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, ShopNavigator } from '../navigation/Navigation'
import { ICombinedStates } from '../state/store'

const UI = () => {
  const userId = useSelector<ICombinedStates, string | null>(state => state.auth.userId)

  return (
    <NavigationContainer>
      {
        userId ?
          <ShopNavigator />
          :
          <AuthNavigator />
      }
    </NavigationContainer>
  )
}

export default UI
