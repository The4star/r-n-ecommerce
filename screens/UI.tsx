import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, ShopNavigator } from '../navigation/Navigation'
import { ICombinedStates } from '../state/store'

const UI = () => {
  const userID = useSelector<ICombinedStates, string | null>(state => state.auth.userID)
  return (
    <NavigationContainer>
      {
        userID ?
          <ShopNavigator />
          :
          <AuthNavigator />
      }
    </NavigationContainer>
  )
}

export default UI
