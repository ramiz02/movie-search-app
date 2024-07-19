import React, {Component} from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
`

class SearchBar extends Component {
  state = {
    query: '',
  }

  handleInputChange = event => {
    this.setState({query: event.target.value})
  }

  handleSearch = () => {
    if (this.state.query.trim()) {
      this.props.onSearch(this.state.query.trim())
    }
  }

  render() {
    return (
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search for a movie"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleSearch}>Search</Button>
      </SearchContainer>
    )
  }
}

export default SearchBar
