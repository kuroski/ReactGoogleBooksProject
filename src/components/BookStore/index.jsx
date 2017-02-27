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
      pageCount: 0
    }

    this.executeBookSearch = this.executeBookSearch.bind(this)
    this.executePageChange = this.executePageChange.bind(this)
    this.searchAllBooks = this.searchAllBooks.bind(this)
    this.executeFavoriteBook = this.executeFavoriteBook.bind(this)
  }

  executeBookSearch(term) {
    if(!term) {
      this.setState({
        message: <FormattedMessage id="app.errors.nosearchtermprovided" defaultMessage="Nenhum termo de pesquisa foi digitado"></FormattedMessage>
      })
      return
    }

    return this.searchAllBooks(term)
  }

  executePageChange(toPage) {
    return this.searchAllBooks(this.state.currentSearchTerm, toPage)
  }

  searchAllBooks(term, page = 0) {
    return booksApi.all(term, page)
      .then(books => {
        this.setState({
          message: '',
          books: books.items,
          currentSearchTerm: term,
          currentPage: page,
          pageCount: Math.ceil(books.totalItems / 10)
        })
      })
  }

  executeFavoriteBook(bookId) {}

  render() {
    return (
      <div className="BookStore">
        <div>{this.state.message}</div>
        <SearchForm onSubmit={this.executeBookSearch} />
        <BookShelf onFavorite={this.executeFavoriteBook} books={this.state.books} />
        <Pagination currentPage={this.state.currentPage} pageCount={this.state.pageCount} onPageChange={this.executePageChange} />
      </div>
    )
  }
}

export default BookStore
