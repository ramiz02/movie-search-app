import React, {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import SearchBar from './component/SearchBar'
import MovieCard from './component/MovieCard'
import styled from 'styled-components'

const Container = styled.div`
  background-image: linear-gradient(#a2fce6, #75dbfa, #4d9af4);
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ListContainer = styled.div`
  background-image: url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg'); /* Slightly transparent background */
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
`

class App extends Component {
  state = {
    isLoading: false,
    movies: [],
    error: '',
  }

  fetchMovies = async query => {
    this.setState({isLoading: true, error: ''})
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`,
      )
      const data = await response.json()
      this.setState({movies: data.docs, isLoading: false})
    } catch (err) {
      this.setState({error: 'Failed to fetch movies', isLoading: false})
    }
  }

  renderLoadingView = () => (
    <LoadingContainer>
      <ThreeDots color="#0b69ff" height={50} width={50} />
      <p>Please wait while fetching your data</p>
    </LoadingContainer>
  )

  render() {
    const {isLoading, movies, error} = this.state
    return (
      <Container>
        <SearchBar onSearch={this.fetchMovies} />
        {isLoading && this.renderLoadingView()}
        {error && <p>{error}</p>}
        {!isLoading && (
          <ListContainer>
            {movies.map(movie => (
              <MovieCard key={movie.key} movie={movie} />
            ))}
          </ListContainer>
        )}
      </Container>
    )
  }
}

export default App
