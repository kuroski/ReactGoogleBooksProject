import React, {Component} from 'react'

const propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
}

class Pagination extends Component {
  render() {
    return (
      <div className="Pagination">
        Pagination
      </div>
    )
  }
}

Pagination.propTypes = propTypes

export default Pagination
