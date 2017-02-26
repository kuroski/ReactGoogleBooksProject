import React, {Component} from 'react'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import Pagination from '../Pagination'
import * as booksApi from '../../api'
import {FormattedMessage} from 'react-intl'

class BookStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      message: '',
      currentSearchTerm: '',
      currentPage: 0,
      currentPageCount: 0
    }

    this.executeBookSearch = this.executeBookSearch.bind(this)
    this.executePageChange = this.executePageChange.bind(this)
  }

  executeBookSearch(term) {
    if(!term) {
      this.setState({
        message: <FormattedMessage id="app.errors.nosearchtermprovided" defaultMessage="Nenhum termo de pesquisa foi digitado"></FormattedMessage>
      })
      return
    }

    this.setState({
      message: ''
    })
    return booksApi.all(term)
      .then(books => {
        this.setState({
          books: books.items,
          currentSearchTerm: term,
          currentPage: 0
        })
      })
  }

  executePageChange(to) {
  }

  render() {
    return (
      <div className="BookStore">
        <div>{this.state.message}</div>
        <SearchForm onSubmit={this.executeBookSearch} />
        <BookShelf books={this.state.books} />
        <Pagination currentPage={this.state.currentPage} pageCount={this.state.currentPageCount} onPageChange={this.executePageChange} />
      </div>
    )
  }
}

export default BookStore
