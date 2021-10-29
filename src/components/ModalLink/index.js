import React from 'react'
import { Feather } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'

import { BackButton, Name } from './styles'

function ModaLink({ link, title, closeModal }) {
  return (
    <>
      <BackButton onPress={closeModal}>
        <Feather name="x" size={35} color="#FFF" />
        <Name numberOfLines={1}>{title}</Name>
      </BackButton>

      <WebView source={{ uri: link }} />
    </>
  )
}

export default ModaLink
