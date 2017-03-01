import React, {Component} from 'react'
import * as booksApi from '../../api'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'
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
  min-width: 128px;
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
  params: React.PropTypes.object.isRequired
}

class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {},
      message: ''
    }

    this.executeBookSearch = this.executeBookSearch.bind(this)
    this.renderBookDetail = this.renderBookDetail.bind(this)
  }

  componentWillMount() {
    this.executeBookSearch(this.props.params.bookId)
  }

  executeBookSearch(bookId) {
    return booksApi.find(bookId)
      .then(book => {
        return this.setState({
          book: book
        })
      })
      .catch(error => {
        return this.setState({
          message: <FormattedMessage id="app.errors.booknotfound" defaultMessage="Nenhum livro foi encontrado"></FormattedMessage>
        })
      })
  }

  renderBookDetail() {
    return (
      <Container className='c-book'>
        <ImageContainer>
          <img src={this.state.book.volumeInfo.imageLinks.thumbnail} alt={this.state.book.volumeInfo.title} />
        </ImageContainer>
        <BookInfoContainer>
          {this.state.book.volumeInfo.title}
          <Link to="/">
            <i className="material-icons">home</i>
          </Link>
        </BookInfoContainer>
      </Container>
    )
  }

  render() {
    if(Object.keys(this.state.book).length) {
      return this.renderBookDetail()
    } else {
      return (
        <div>
          <Link to="/">Home</Link>
        </div>
      )
    }
  }
}

BookDetail.propTypes = propTypes

export default BookDetail