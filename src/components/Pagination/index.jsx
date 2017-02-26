import React, {Component} from 'react'

const propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
}

class Pagination extends Component {
  constructor(props) {
    super(props)

    this.currentPageClass = this.currentPageClass.bind(this)
  }

  currentPageClass(index) {
    if(index !== this.props.currentPage) return ''
    return 'c-pagination__page--current'
  }

  render() {
    return (
      <div className="c-pagination">
        {[...Array(this.props.pageCount).keys()]
          .map((index) => {
            return <div key={index} className={`c-pagination__page ${this.currentPageClass(index)}`}>{index}</div>
          })}
      </div>
    )
  }
}

Pagination.propTypes = propTypes

export default Pagination
