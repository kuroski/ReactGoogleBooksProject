import React, {Component} from 'react'
import {Link} from 'react-router'
import Highlighter from 'react-highlight-words'

const propTypes = {
  bookId: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired,
  term: React.PropTypes.string
}

class Book extends Component {
  constructor(props) {
    super(props)
    this.favoriteBook = this.favoriteBook.bind(this)
    this.isOnFavorite = this.isOnFavorite.bind(this)
    this.renderFavoritedBook = this.renderFavoritedBook.bind(this)
    this.renderBook = this.renderBook.bind(this)
  }

  isOnFavorite(bookId) {
    return this.props.isOnFavorite(bookId)
  }

  favoriteBook(bookId, index) {
    this.props.onFavorite(bookId, index)
  }

  renderFavoritedBook() {
    return (
      <li className="c-book c-book--favorited" key={this.props.index}>
        <Highlighter
          searchWords={[this.props.term]}
          textToHighlight={this.props.title}
          highlightClassName="Highlight"
        />
        <Link to={`/${this.props.bookId}`}>Detail</Link>
      </li>
    )
  }

  renderBook(item, index) {
    return (
      <li className="c-book" key={this.props.index}>
        <Highlighter
          searchWords={[this.props.term]}
          textToHighlight={this.props.title}
          highlightClassName="Highlight"
        />
        <Link to={`/${this.props.bookId}`}>Detail</Link>
        <button onClick={() => this.favoriteBook(this.props.bookId, this.props.index)} className='c-book__favorite'>
          Favorite
        </button>
      </li>
    )
  }

  render() {
    if(this.isOnFavorite(this.props.bookId)) {
      return this.renderFavoritedBook()
    }
    return this.renderBook()
  }
}

Book.propTypes = propTypes

export default Book