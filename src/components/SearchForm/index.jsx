import React, {Component, PropTypes} from 'react'

const propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class SearchForm extends Component {
  render() {
    return (
      <div className="SearchForm">
        <input />
        <button>Add</button>
      </div>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm