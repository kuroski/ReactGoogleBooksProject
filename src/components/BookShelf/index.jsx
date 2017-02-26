import React, {Component} from 'react'

const propTypes = {
  books: React.PropTypes.array.isRequired
}

class BookShelf extends Component {
  render() {
    return this.props.books.length ? (
      <ul className="BookShelf">
        {this.props.books.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>
        })}
      </ul>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
