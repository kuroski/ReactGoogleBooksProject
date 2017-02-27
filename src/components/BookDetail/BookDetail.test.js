import React from 'react'
import BookDetail from './'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import {shallowWithIntl} from '../../test/helpers/intl-enzyme-test-helper'
import bookJson from '../../test/__mocks__/book.json'
import nock from 'nock'
import {API_URL, HARRY_POTTER_GET_URL} from '../../test/__mocks__/constants'

describe('Book', () => {
  afterEach(() => {
      nock.cleanAll()
  })

  it('renders correctly', () => {
    const BookDetailTree = renderer.create(
      <BookDetail />
    ).toJSON()
    expect(BookDetailTree).toMatchSnapshot()
  })

  it('should list searched book', () => {
    nock(API_URL)
      .get(HARRY_POTTER_GET_URL)
      .reply(200, bookJson)

    const wrapper = shallow(<BookDetail />)
    wrapper.instance().executeBookSearch(bookJson.id)
      .then(data => {
        expect(wrapper.state('book')).toEqual(bookJson)
        expect(wrapper.state('message')).toBeNull()
      })
      .catch(error => {
        expect(error).toEqual(error)
      })
  })
})