import React, {Component} from 'react'
import Book from '../Book'

const propTypes = {
  books: React.PropTypes.array.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired
}

class BookShelf extends Component {
  render() {
    return this.props.books.length ? (
      <ul className="BookShelf">
        {this.props.books.map((item, index) => {
          return (
            <Book
              key={index}
              bookId={item.id}
              index={index}
              title={item.volumeInfo.title}
              onFavorite={this.props.onFavorite}
              isOnFavorite={this.props.isOnFavorite}
            />
          )
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
