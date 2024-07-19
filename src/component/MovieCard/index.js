import React, {Component} from 'react'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px;
  text-align: center;
  font-family: Bree Serif;
`

const Image = styled.img`
  height: 200px;
  width: auto;
`

const Heading = styled.h1`
  color: #ffffff;
  font-family: Bree Serif;
  font-size: 25px;
  text-decoration: underline;
`

const Paragraph = styled.p`
  color: #ffffff;
  font-family: sans-serif;
  font-size: 18px;
`

class MovieCard extends Component {
  state = {
    dogImage: '',
  }

  componentDidMount() {
    this.fetchDogImage()
  }

  fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json()
      this.setState({dogImage: data.message})
    } catch (error) {
      console.error('Failed to fetch dog image')
    }
  }

  render() {
    const {movie} = this.props
    const {dogImage} = this.state
    return (
      <Card>
        <Image src={dogImage} alt="Random dog" />
        <Heading>{movie.title}</Heading>
        <Paragraph>
          {movie.author_name ? movie.author_name.join(', ') : 'Unknown Author'}
        </Paragraph>
        <Paragraph>{movie.first_publish_year}</Paragraph>
      </Card>
    )
  }
}

export default MovieCard
