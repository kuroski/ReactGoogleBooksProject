import React, {Component} from 'react'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
}

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)
  }

  changePage(index) {
    if(index.selected === this.props.currentPage) return
    this.props.onPageChange(index.selected)
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <ReactPaginate
          containerClassName="c-pagination"
          pageClassName="c-pagination__page"
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.changePage}
          activeClassName="c-pagination__page--current"
          disabledClassName="c-pagination__page--disabled"
          previousLabel=""
          nextLabel=""
        />
      </Container>
    )
  }
}

Pagination.propTypes = propTypes

export default Pagination
