import React, {Component} from 'react'

const propTypes = {
  books: React.PropTypes.array.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired
}

class BookShelf extends Component {
  constructor(props) {
    super(props)
    this.favoriteBook = this.favoriteBook.bind(this)
    this.isOnFavorite = this.isOnFavorite.bind(this)
  }

  favoriteBook(bookId) {
    this.props.onFavorite(bookId)
  }

  isOnFavorite(bookId) {
    return this.props.isOnFavorite(bookId)
  }

  renderFavoritedBook(item, index) {
    return (
      <li className="c-book c-book--favorited" key={index}>
        {item.volumeInfo.title}
      </li>
    )
  }

  renderBook(item, index) {
    return (
      <li className="c-book" key={index}>
        {item.volumeInfo.title}
        <button onClick={() => this.favoriteBook(item.id)} className='c-book__favorite'>
          Favorite
        </button>
      </li>
    )
  }

  render() {
    return this.props.books.length ? (
      <ul className="BookShelf">
        {this.props.books.map((item, index) => {
          if(this.isOnFavorite(item.id)) {
            return this.renderFavoritedBook(item, index)
          }

          return this.renderBook(item, index)
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
