import React, {Component} from 'react'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'

class BookStore extends Component {
  render() {
    return (
      <div className="BookStore">
        <SearchForm />
        <BookShelf />
      </div>
    )
  }
}

export default BookStore
