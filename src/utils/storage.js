import AsyncStorage from '@react-native-async-storage/async-storage'

// Buscar os filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key)

  let moviesSave = JSON.parse(myMovies) || []

  return moviesSave
}

// Salvar um novo filme
export async function saveMovie(key, newMovie) {
  let moviesStored = await getMoviesSave(key)

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id)

  if (hasMovie) {
    console.log('Esse filme já existe na sua lista!')
    return
  }

  moviesStored.push(newMovie)

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
  console.log('Filme salvo com sucesso!')
}

// Deletar algum filme específico
export async function deleteMovie(id) {
  let moviesStored = await getMoviesSave('@appmovies')

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id
  })

  await AsyncStorage.setItem('@appmovies', JSON.stringify(myMovies))
  console.log('Filme deletado com sucesso')

  return myMovies
}

// Filtrar algum filmes se já está salvo
export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@appmovies')

  const hasMovie = moviesStored.find((item) => item.id === movie.id)

  if (hasMovie) {
    return true
  }

  return false
}
