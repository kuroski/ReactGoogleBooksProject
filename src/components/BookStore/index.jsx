import React, {Component} from 'react'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import * as booksApi from '../../api'

class BookStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }

    this.executeBookSearch = this.executeBookSearch.bind(this)
  }

  executeBookSearch(term) {
    return booksApi.all(term)
      .then(books => {
        this.setState({
          books: [].concat(this.state.books).concat(books.items)
        })
      })
  }

  render() {
    return (
      <div className="BookStore">
        <SearchForm onSubmit={this.executeBookSearch} />
        <BookShelf />
      </div>
    )
  }
}

export default BookStore
