import React, {Component} from 'react'
import Book from '../Book'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const propTypes = {
  books: React.PropTypes.array.isRequired,
  toggleFavorite: React.PropTypes.func.isRequired,
  isOnFavorite: React.PropTypes.func.isRequired,
  term: React.PropTypes.string
}

class BookShelf extends Component {
  render() {
    return this.props.books.length ? (
      <Container>
        {this.props.books.map((item, index) => {
          return (
            <Book
              key={index}
              bookId={item.id}
              index={index}
              title={item.volumeInfo.title}
              image={item.volumeInfo.imageLinks.thumbnail}
              toggleFavorite={this.props.toggleFavorite}
              isOnFavorite={this.props.isOnFavorite}
              term={this.props.term}
            />
          )
        })}
      </Container>
    ) : null
  }
}

BookShelf.propTypes = propTypes

export default BookShelf
