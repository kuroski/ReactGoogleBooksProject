import React, {Component, PropTypes} from 'react'

const propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SearchForm">
        Hello Search form
      </div>
    )
  }
}

SearchForm.propTypes = propTypes

export default SearchForm