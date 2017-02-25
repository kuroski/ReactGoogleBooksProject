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
  }

  componentDidMount () {
    booksApi.all('Harry Potter', 2)
      .then((result) => {
        console.log(result)
      })
  }

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
