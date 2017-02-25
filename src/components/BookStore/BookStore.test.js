import React from 'react'
import BookStore from './'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from './__mocks__/books.json'
import nock from 'nock'

const API_URL = 'https://www.googleapis.com/books/v1'

describe('BookStore', () => {
  afterEach(() => {
      nock.cleanAll()
  })

  it('renders correctly', () => {
    const BookStoreTree = renderer.create(
      <BookStore />
    ).toJSON()
    expect(BookStoreTree).toMatchSnapshot()
  })

  it('should render a SearchForm and a BookShelf', () => {
    const wrapper = shallow(<BookStore />)
    const executeBookSearch = wrapper.instance().executeBookSearch
    expect(wrapper.containsAllMatchingElements([
      <SearchForm onSubmit={executeBookSearch} />,
      <BookShelf />
    ])).toEqual(true)
  })

  it('should start with an empty book list', () => {
    const wrapper = shallow(<BookStore />)
    expect(wrapper.state('books')).toEqual([])
  })

  it('should list searched books', () => {
    nock(API_URL)
      .get('/volumes?q=Harry%20Potter')
      .reply(200, booksJson)

    const wrapper = shallow(<BookStore />)
    wrapper.instance().executeBookSearch('Harry Potter')
      .then(data => {
        expect(wrapper.state('books')).toEqual(booksJson.items)
      })
  })

  it('passes executeBookSearch to SearchForm', () => {
    const wrapper = shallow(<BookStore />)
    const searchForm = wrapper.find(SearchForm)
    const executeBookSearch = wrapper.instance().executeBookSearch
    expect(searchForm.prop('onSubmit')).toEqual(executeBookSearch)
  })

  it('passes a bound executeBookSearch to SearchForm', () => {
    nock(API_URL)
      .get('/volumes?q=Harry%20Potter')
      .reply(200, booksJson)

    const wrapper = shallow(<BookStore />)
    const searchForm = wrapper.find(SearchForm)
    searchForm.prop('onSubmit')('HarryPotter')
      .then(data => {
        expect(wrapper.state('books')).toEqual(booksJson.items)
      })
  })
})
