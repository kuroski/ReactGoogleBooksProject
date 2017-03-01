import React, {Component} from 'react'
import {Link} from 'react-router'
import Highlighter from 'react-highlight-words'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  padding: .5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const ImageContainer = styled.div`
  position: relative;
`

const BookInfoContainer = styled.div`
  position: relative;
  padding: 0 .5rem;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  font-size: 1.4rem;
  justify-content: space-between;
`

const Favorite = styled.button`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  border: none;
  outline: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50rem;
  width: 40px;
  height: 40px;
  line-height: 4;
  cursor: pointer;
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
        <Favorite onClick={() => this.favoriteBook(this.props.bookId, this.props.index)} className='c-book__unfavorite'>
          <i className="material-icons">favorite</i>
        </Favorite>
      )
    }

    return (
      <Favorite onClick={() => this.favoriteBook(this.props.bookId, this.props.index)} className='c-book__favorite'>
        <i className="material-icons">favorite_border</i>
      </Favorite>
    )
  }

  render() {
    const isOnFavorite = this.isOnFavorite(this.props.bookId)
    const actionButton = this.renderActionButton(isOnFavorite)

    return (
      <Container className={`c-book ${(isOnFavorite) ? 'c-book--favorited' : ''}`} key={this.props.index}>
        <ImageContainer>
          <img src={this.props.image} alt={this.props.title} />
          {actionButton}
        </ImageContainer>
        <BookInfoContainer>
          <Highlighter
            searchWords={[this.props.term]}
            textToHighlight={this.props.title}
            highlightClassName="Highlight"
          />
          <Link to={`/${this.props.bookId}`}>
            <i className="material-icons">info_outline</i>
          </Link>
        </BookInfoContainer>
      </Container>
    )
  }
}

Book.propTypes = propTypes

export default Book