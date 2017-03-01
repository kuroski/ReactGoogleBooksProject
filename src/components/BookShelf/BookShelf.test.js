import React from 'react'
import BookShelf from './'
import Book from '../Book'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={[]} />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render a Book when a list of books is passed', () => {
    const firstBook = booksJson.items[0]
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const toggleFavorite = wrapper.prop('toggleFavorite')
    const isOnFavorite = wrapper.prop('isOnFavorite')
    expect(wrapper.containsAllMatchingElements([
      <Book key={0} bookId={firstBook.id} index={0} title={firstBook.volumeInfo.title} image={firstBook.volumeInfo.imageLinks.thumbnail} toggleFavorite={toggleFavorite} isOnFavorite={isOnFavorite} term="Harry Potter" />
    ])).toEqual(true)
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={[]} term="Harry Potter" />)
    expect(wrapper.find(Book)).toHaveLength(0)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
  })

  it('should render some books', () => {
    const wrapper = shallow(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    expect(wrapper.find(Book)).toHaveLength(2)
  })

  it('passes bookId to Book component', () => {
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const book = wrapper.find(Book).first()
    expect(book.prop('bookId')).toEqual(booksJson.items[0].id)
  })

  it('passes index to Book component', () => {
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const book = wrapper.find(Book).first()
    expect(book.prop('index')).toEqual(0)
  })

  it('passes title to Book component', () => {
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const book = wrapper.find(Book).first()
    expect(book.prop('title')).toEqual(booksJson.items[0].volumeInfo.title)
  })

  it('passes toggleFavorite to Book component', () => {
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const book = wrapper.find(Book).first()
    const toggleFavorite = wrapper.prop('toggleFavorite')
    expect(book.prop('toggleFavorite')).toEqual(toggleFavorite)
  })

  it('passes isOnFavorite to Book component', () => {
    const wrapper = mount(<BookShelf toggleFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} term="Harry Potter" />)
    const book = wrapper.find(Book).first()
    const isOnFavorite = wrapper.prop('isOnFavorite')
    expect(book.prop('isOnFavorite')).toEqual(isOnFavorite)
  })
})