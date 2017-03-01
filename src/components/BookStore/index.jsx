import React, {Component} from 'react'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import Pagination from '../Pagination'
import Message from './Message'
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
    this.isOnFavorite = this.isOnFavorite.bind(this)
    this.toggleFavoritedBook = this.toggleFavoritedBook.bind(this)
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

  executeFavoriteBook(bookId, index) {
    if(!window.localStorage.getItem('favoritedBooks')) window.localStorage.setItem('favoritedBooks', JSON.stringify([]))

    this.toggleFavoritedBook(bookId)

    const books = this.state.books
    books[index]['isOnFavorite'] = !books[index]['isOnFavorite']
    this.setState({
      books: books
    })
  }

  isOnFavorite(bookId) {
    if(!window.localStorage.getItem('favoritedBooks')) return false
    const favoritedBooks = JSON.parse(window.localStorage.getItem('favoritedBooks'))
    return (favoritedBooks.find(entity => entity === bookId)) ? true : false
  }

  toggleFavoritedBook(bookId) {
    let favoritedBooks = JSON.parse(window.localStorage.getItem('favoritedBooks'))
    let newFavoritedBooks = []
    if(favoritedBooks.indexOf(bookId) >= 0) {
      newFavoritedBooks = favoritedBooks.filter(book => {
        return book !== bookId
      })
    } else
      newFavoritedBooks = [].concat(favoritedBooks).concat([bookId])

    window.localStorage.setItem('favoritedBooks', JSON.stringify(newFavoritedBooks))
  }

  render() {
    return (
      <div className="BookStore">
        <Message>{this.state.message}</Message>
        <SearchForm onSubmit={this.executeBookSearch} />
        <BookShelf toggleFavorite={this.executeFavoriteBook} isOnFavorite={this.isOnFavorite} books={this.state.books} term={this.state.currentSearchTerm} />
        <Pagination currentPage={this.state.currentPage} pageCount={this.state.pageCount} onPageChange={this.executePageChange} />
      </div>
    )
  }
}

export default BookStore
