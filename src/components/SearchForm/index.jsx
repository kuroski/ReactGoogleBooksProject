import React, {Component, PropTypes} from 'react'

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
      <form className="SearchForm">
        <input value={this.state.term} onChange={this.setTerm} />
        <button onClick={this.executeSearch}>Search</button>
      </form>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm