import React from 'react'
import BookStore from './'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import Pagination from '../Pagination'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import {shallowWithIntl} from '../../test/helpers/intl-enzyme-test-helper'
import booksJson from '../../test/__mocks__/books.json'
import nock from 'nock'
import {API_URL, BOOKS_PER_PAGE, HARRY_POTTER_URL, HARRY_POTTER_URL_SECOND_PAGE} from '../../test/__mocks__/constants'
import localStorageMock from '../../test/__mocks__/localStorage'

describe('BookStore', () => {
  beforeEach(() => {
    window.localStorage = localStorageMock
  })

  afterEach(() => {
      nock.cleanAll()
      window.localStorage.clear()
  })

  it('renders correctly', () => {
    const BookStoreTree = renderer.create(
      <BookStore />
    ).toJSON()
    expect(BookStoreTree).toMatchSnapshot()
  })

  it('should render a SearchForm a BookShelf and a Pagination', () => {
    const wrapper = shallow(<BookStore />)
    const executeBookSearch = wrapper.instance().executeBookSearch
    const executePageChange = wrapper.instance().executePageChange
    const executeFavoriteBook = wrapper.instance().executeFavoriteBook
    const isOnFavorite = wrapper.instance().isOnFavorite
    expect(wrapper.containsAllMatchingElements([
      <SearchForm onSubmit={executeBookSearch} />,
      <BookShelf onFavorite={executeFavoriteBook} isOnFavorite={isOnFavorite} books={[]} />,
      <Pagination currentPage={0} pageCount={0} onPageChange={executePageChange} />
    ])).toEqual(true)
  })

  it('should start with an empty book list', () => {
    const wrapper = shallow(<BookStore />)
    expect(wrapper.state('books')).toEqual([])
  })

  it('should list searched books', () => {
    nock(API_URL)
      .get(HARRY_POTTER_URL)
      .reply(200, booksJson)

    const wrapper = shallow(<BookStore />)
    wrapper.instance().executeBookSearch('Harry Potter')
      .then(data => {
        expect(wrapper.state('books')).toEqual(booksJson.items)
        expect(wrapper.state('message')).toBeNull()
      })
      .catch(error => {
        expect(error).toEqual(error)
      })
  })

  it('should throw an error when searching without a term', () => {
    const wrapper = shallowWithIntl(<BookStore />)
    wrapper.instance().executeBookSearch()
    expect(wrapper.state('message').props.id).toEqual('app.errors.nosearchtermprovided')
  })

  it('passes executeBookSearch to SearchForm', () => {
    const wrapper = shallow(<BookStore />)
    const searchForm = wrapper.find(SearchForm)
    const executeBookSearch = wrapper.instance().executeBookSearch
    expect(searchForm.prop('onSubmit')).toEqual(executeBookSearch)
  })

  it('passes a bound executeBookSearch to SearchForm', () => {
    nock(API_URL)
      .get(HARRY_POTTER_URL)
      .reply(200, booksJson)

    const wrapper = shallow(<BookStore />)
    const searchForm = wrapper.find(SearchForm)
    searchForm.prop('onSubmit')('HarryPotter')
      .then(data => {
        expect(wrapper.state('books')).toEqual(booksJson.items)
      })
      .catch(error => {
        expect(error).toEqual(error)
      })
  })

  it('renders the books', () => {
    nock(API_URL)
      .get(HARRY_POTTER_URL)
      .reply(200, booksJson)

    const wrapper = mount(<BookStore />)
    wrapper.instance().executeBookSearch('Harry Potter')
      .then(() => {
        expect(wrapper.find('li')).toHaveLength(2)
      })
  })

  it('should paginate search results', () => {
    nock(API_URL)
      .get(HARRY_POTTER_URL)
      .reply(200, booksJson)

    const wrapper = mount(<BookStore />)
    const searchTerm = 'Harry Potter'
    wrapper.instance().executeBookSearch(searchTerm)
      .then(() => {
        expect(wrapper.find('li')).toHaveLength(2)
        expect(wrapper.state('currentSearchTerm')).toEqual(searchTerm)
        expect(wrapper.state('currentPage')).toEqual(0)
        expect(wrapper.state('pageCount')).toEqual(Math.ceil(booksJson.totalItems / BOOKS_PER_PAGE))
      })
  })

  it('passes executePageChange to Pagination component', () => {
    const wrapper = shallow(<BookStore />)
    const pagination = wrapper.find(Pagination)
    const executePageChange = wrapper.instance().executePageChange
    expect(pagination.prop('onPageChange')).toEqual(executePageChange)
  })

  it('passes a bound executePageChange to Pagination component', () => {
    nock(API_URL)
      .get(HARRY_POTTER_URL_SECOND_PAGE)
      .reply(200, booksJson)

    const wrapper = shallow(<BookStore />)
    const pagination = wrapper.find(Pagination)
    pagination.prop('onPageChange')(1)
      .then(data => {
        expect(wrapper.state('books')).toEqual(booksJson.items)
      })
      .catch(error => {
        expect(error).toEqual(error)
      })
  })

  it('passes onFavorite to BookShelf component', () => {
    const wrapper = shallow(<BookStore />)
    const bookShelf = wrapper.find(BookShelf)
    const executeFavoriteBook = wrapper.instance().executeFavoriteBook
    expect(bookShelf.prop('onFavorite')).toEqual(executeFavoriteBook)
  })

  it('passes a bound onFavorite to BookShelf component', () => {
    const bookId = 'K_yxDAAAQBAJ'
    const wrapper = shallow(<BookStore />)
    const bookShelf = wrapper.find(BookShelf)
    bookShelf.prop('onFavorite')(bookId)
    expect(window.localStorage).toBeDefined()
    expect(window.localStorage.getItem('favoritedBooks')).toBeDefined()
    expect(window.localStorage.getItem('favoritedBooks')[0]).toEqual(bookId)
  })

  it('passes isOnFavorite to BookShelf component', () => {
    const wrapper = shallow(<BookStore />)
    const bookShelf = wrapper.find(BookShelf)
    const isOnFavorite = wrapper.instance().isOnFavorite
    expect(bookShelf.prop('isOnFavorite')).toEqual(isOnFavorite)
  })
})