import React, {Component} from 'react'
import * as booksApi from '../../api'
import {FormattedMessage} from 'react-intl'

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
        this.setState({
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
    return <div>
        {this.state.book.volumeInfo.title}
        <img src={this.state.book.volumeInfo.imageLinks.thumbnail} alt={this.state.book.volumeInfo.title} />
      </div>
  }

  render() {
    if(Object.keys(this.state.book).length) {
      return this.renderBookDetail()
    } else {
      return (
        <div>
          {this.state.message}
          {this.props.params.bookId}
        </div>
      )
    }
  }
}

BookDetail.propTypes = propTypes

export default BookDetail