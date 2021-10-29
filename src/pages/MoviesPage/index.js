import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import Header from '../../components/Header'
import FavoriteItem from '../../components/FavoriteItem'

import { deleteMovie, getMoviesSave } from '../../utils/storage'

import { Container, ListMovies } from './styles'

function MoviesPage() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [movies, setMovies] = useState([])

  useEffect(() => {
    let isActive = true

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@appmovies')

      if (isActive) {
        setMovies(result)
        console.log(result)
      }
    }

    if (isActive) {
      getFavoriteMovies()
    }

    return () => {
      isActive = false
    }
  }, [isFocused])

  async function handleDelete(id) {
    const result = await deleteMovie(id)
    setMovies(result)
  }

  function navigateDetailsPage(item) {
    navigation.navigate('Details', { id: item.id })
  }

  return (
    <Container>
      <Header title="Meus filmes" />

      <ListMovies
        data={movies}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem data={item} deleteMovie={handleDelete} navigatePage={() => navigateDetailsPage(item)} />
        )}
      />
    </Container>
  )
}

export default MoviesPage
