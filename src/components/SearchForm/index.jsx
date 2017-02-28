import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'

const Container = styled.form`
    background-color: #6D7993;
    padding: 1rem;
    text-align: center;
`;

const propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: ''
    }
    this.setTerm = this.setTerm.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
  }

  setTerm(event) {
    this.setState({term: event.target.value})
  }

  executeSearch(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.term)
  }

  render() {
    return (
      <Container>
        <input value={this.state.term} onChange={this.setTerm} />
        <button onClick={this.executeSearch}>Search</button>
      </Container>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm