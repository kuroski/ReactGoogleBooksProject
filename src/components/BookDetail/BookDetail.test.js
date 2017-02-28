import React from 'react'
import BookDetail from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import {shallowWithIntl} from '../../test/helpers/intl-enzyme-test-helper'
import bookJson from '../../test/__mocks__/book.json'
import errorBookJson from '../../test/__mocks__/errorBook.json'
import nock from 'nock'
import {API_URL, HARRY_POTTER_GET_URL, HARRY_POTTER_GET_WRONG_URL} from '../../test/__mocks__/constants'
import {Link} from 'react-router'

describe('Book', () => {
  afterEach(() => {
      nock.cleanAll()
  })

  it('renders correctly', () => {
    const BookDetailTree = renderer.create(
      <BookDetail params={{bookId: bookJson.id}} />
    ).toJSON()
    expect(BookDetailTree).toMatchSnapshot()
  })

  it('should list searched book', () => {
    nock(API_URL)
      .get(HARRY_POTTER_GET_URL)
      .reply(200, bookJson)

    const wrapper = shallow(<BookDetail params={{bookId: bookJson.id}} />)
    wrapper.instance().executeBookSearch(bookJson.id)
      .then(data => {
        expect(wrapper.state('book')).toEqual(bookJson)
        expect(wrapper.state('message')).toBeNull()
      })
      .catch(error => {
        expect(error).toEqual(error)
      })
  })

  it('should throw an error when searching with an invalid ID', () => {
    nock(API_URL)
      .get(HARRY_POTTER_GET_WRONG_URL)
      .replyWithError(errorBookJson)

    const wrapper = shallowWithIntl(<BookDetail params={{bookId: 123}} />)
    wrapper.instance().executeBookSearch(123).then(result => {
      expect(wrapper.state('message').props.id).toEqual('app.errors.booknotfound')
    })
  })

  it('renders the book', () => {
    nock(API_URL)
      .get(HARRY_POTTER_GET_URL)
      .reply(200, bookJson)

    const wrapper = shallow(<BookDetail params={{bookId: bookJson.id}} />)
    wrapper.instance().executeBookSearch(bookJson.id).then(book => {
      expect(wrapper.state('book').volumeInfo.title).toEqual(book.volumeInfo.title)
      expect(wrapper.find(book.volumeInfo.title)).toEqual(bookJson.volumeInfo.title)
    })
  })

  it('should render a link to home screen', () => {
    const wrapper = shallow(<BookDetail params={{bookId: bookJson.id}} />)
    expect(wrapper.containsAllMatchingElements([
      <Link to="/">Home</Link>
    ])).toEqual(true)
  })
})