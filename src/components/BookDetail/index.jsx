import React, {Component} from 'react'

class BookDetail extends Component {
  render() {
    return (
      <div>Hello Book Detail {this.props.params.bookId}</div>
    )
  }
}

export default BookDetail