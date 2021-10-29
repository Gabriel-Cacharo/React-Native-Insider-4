// Gerar lista de filmes com tamanho que eu desejar.
export function getListMovies(size, movies) {
  let popularMovies = []

  for(let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i])
  }

  return popularMovies
}

// Gerar um numero aleatório com base na lista de filmes que eu passar
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length)
}