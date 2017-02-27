import React, {Component} from 'react'

const propTypes = {
  books: React.PropTypes.array.isRequired,
  onFavorite: React.PropTypes.func.isRequired
}

class BookShelf extends Component {
  constructor(props) {
    super(props)
    this.favoriteBook = this.favoriteBook.bind(this)
  }

  favoriteBook(bookId) {
    this.props.onFavorite(bookId)
  }

  render() {
    return this.props.books.length ? (
      <ul className="BookShelf">
        {this.props.books.map((item, index) => {
          return (
            <li className="c-book" key={index}>
              {item.volumeInfo.title}
              <button onClick={() => this.favoriteBook(item.id)} className="c-book__favorite">
                Favorite
              </button>
            </li>
          )
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
