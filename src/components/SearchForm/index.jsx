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
  }

  setTerm(event) {
    this.setState({term: event.target.value})
  }

  render() {
    return (
      <div className="SearchForm">
        <input value={this.state.term} onChange={this.setTerm} />
        <button>Add</button>
      </div>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm