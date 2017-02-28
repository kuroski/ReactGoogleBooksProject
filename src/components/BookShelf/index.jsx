import React, {Component} from 'react'
import Book from '../Book'

const propTypes = {
  books: React.PropTypes.array.isRequired,
  toggleFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired,
  term: React.PropTypes.string
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
              toggleFavorite={this.props.toggleFavorite}
              isOnFavorite={this.props.isOnFavorite}
              term={this.props.term}
            />
          )
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
