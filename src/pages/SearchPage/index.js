import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import api, { key } from '../../services/api'

import SearchItem from '../../components/SearchItem'

import { Container, ListMovies } from './styles'
import { Text } from 'react-native'

function SearchPage() {
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    let isActive = true

    async function getSearchMovie() {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
      })

      if (isActive) {
        setMovie(response.data.results)
        setLoading(false)
      }
    }

    if (isActive) {
      getSearchMovie()
      console.log(movie)
    }

    return () => {
      isActive = false
    }
  }, [])

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id })
  }

  if (loading) {
    return (
      <Container>
        <Text>Carregando</Text>
      </Container>
    )
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SearchItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
        keyExtractor={(item) => String(item.id)}
      />
    </Container>
  )
}

export default SearchPage
