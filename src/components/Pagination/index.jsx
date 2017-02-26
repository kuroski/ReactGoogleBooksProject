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
    this.changePage = this.changePage.bind(this)
  }

  currentPageClass(index) {
    if(index !== this.props.currentPage) return ''
    return 'c-pagination__page--current'
  }

  changePage(index) {
    if(index === this.props.currentPage) return
    this.props.onPageChange(index)
  }

  render() {
    return (
      <div className="c-pagination">
        {[...Array(this.props.pageCount).keys()]
          .map((index) => {
            return <button key={index} onClick={() => this.changePage(index)} className={`c-pagination__page ${this.currentPageClass(index)}`}>{index}</button>
          })}
      </div>
    )
  }
}

Pagination.propTypes = propTypes

export default Pagination
