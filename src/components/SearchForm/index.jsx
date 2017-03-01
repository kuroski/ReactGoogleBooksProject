import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'

const Container = styled.form`
  display: flex;
  text-align: center;
  position: relative;
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
        <Input autoFocus value={this.state.term} onChange={this.setTerm} />
        <Button onClick={this.executeSearch}>
          <i className="material-icons">search</i>
        </Button>
      </Container>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm