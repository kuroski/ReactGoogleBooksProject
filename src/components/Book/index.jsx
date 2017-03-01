import React, {Component} from 'react'
import {Link} from 'react-router'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const propTypes = {
  bookId: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  toggleFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired,
  term: React.PropTypes.string
}

class Book extends Component {
  constructor(props) {
    super(props)
    this.favoriteBook = this.favoriteBook.bind(this)
    this.isOnFavorite = this.isOnFavorite.bind(this)
    this.renderActionButton = this.renderActionButton.bind(this)
  }

  isOnFavorite(bookId) {
    return this.props.isOnFavorite(bookId)
  }

  favoriteBook(bookId, index) {
    this.props.toggleFavorite(bookId, index)
  }

  renderActionButton(isOnFavorite) {
    if(isOnFavorite) {
      return (
        <button onClick={() => this.favoriteBook(this.props.bookId, this.props.index)} className='c-book__unfavorite'>
          UNFavorite
        </button>
      )
    }

    return (
      <button onClick={() => this.favoriteBook(this.props.bookId, this.props.index)} className='c-book__favorite'>
        Favorite
      </button>
    )
  }

  render() {
    const isOnFavorite = this.isOnFavorite(this.props.bookId)
    const actionButton = this.renderActionButton(isOnFavorite)

    return (
      <Container className={`c-book ${(isOnFavorite) ? 'c-book--favorited' : ''}`} key={this.props.index}>
        <img src={this.props.image} alt={this.props.title} />
        <Highlighter
          searchWords={[this.props.term]}
          textToHighlight={this.props.title}
          highlightClassName="Highlight"
        />
        <Link to={`/${this.props.bookId}`}>Detail</Link>
        {actionButton}
      </Container>
    )
  }
}

Book.propTypes = propTypes

export default Book