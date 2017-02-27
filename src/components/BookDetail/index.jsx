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
  }

  componentWillMount() {
    this.executeBookSearch(this.props.params.bookId)
  }

  executeBookSearch(bookId) {
    return booksApi.find(bookId)
      .then(response => {
      })
      .catch(error => {
        return this.setState({
          message: <FormattedMessage id="app.errors.booknotfound" defaultMessage="Nenhum livro foi encontrado"></FormattedMessage>
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.message}
        Hello Book Detail {this.props.params.bookId}
      </div>
    )
  }
}

BookDetail.propTypes = propTypes

export default BookDetail