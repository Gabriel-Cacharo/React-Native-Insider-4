import React, { useState, useEffect } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Header from '../../components/Header'
import SliderItem from '../../components/SliderItem'

import api, { key } from '../../services/api'
import { getListMovies, randomBanner } from '../../utils/movie'

import { Container, SearchContainer, Input, SearchButton, Title, BannerButton, Banner, SliderMovie } from './styles'

function HomePage() {
  const [nowMovies, setNowMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])

  const [bannerMovie, setBannerMovie] = useState({})

  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    let isActive = true
    const ac = new AbortController()

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
      ])

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results)
        const popularList = getListMovies(5, popularData.data.results)
        const topList = getListMovies(5, topData.data.results)

        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])

        setNowMovies(nowList)
        setPopularMovies(popularList)
        setTopMovies(topList)

        setLoading(false)
      }
    }

    getMovies()

    return () => {
      isActive = false
      ac.abort()
    }
  }, [])

  function navigateDetailsPage(item) {
    navigation.navigate('Details', { id: item.id })
  }

  function handleSearchMovie() {
    if (input === '') return

    navigation.navigate('Search', { name: input })
    setInput('')
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    )
  }

  return (
    <Container>
      <Header title="App Movies" />

      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>

        <BannerButton activeOpacity={0.9} onPress={() => navigateDetailsPage(bannerMovie)}>
          <Banner
            resizeMethod="resize"
            source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  )
}

export default HomePage
