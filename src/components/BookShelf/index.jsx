import React, {Component} from 'react'

const propTypes = {
  books: React.PropTypes.array.isRequired,
  onFavorite: React.PropTypes.func.isRequired
}

class BookShelf extends Component {
  render() {
    return this.props.books.length ? (
      <ul className="BookShelf">
        {this.props.books.map((item, index) => {
          return (
            <li className="c-book" key={index}>
              {item.volumeInfo.title}
              <button className="c-book__favorite">Favorite</button>
            </li>
          )
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
