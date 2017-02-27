import React from 'react'
import BookShelf from './'
import Book from '../Book'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={[]} />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render a Book when a list of books is passed', () => {
    const firstBook = booksJson.items[0]
    const wrapper = mount(<BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} />)
    const onFavorite = wrapper.prop('onFavorite')
    const isOnFavorite = wrapper.prop('isOnFavorite')
    expect(wrapper.containsAllMatchingElements([
      <Book key={0} bookId={firstBook.id} index={0} title={firstBook.volumeInfo.title} onFavorite={onFavorite} isOnFavorite={isOnFavorite} />
    ])).toEqual(true)
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={[]} />)
    expect(wrapper.find(Book)).toHaveLength(0)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
  })

  it('should render some books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} />)
    expect(wrapper.find(Book)).toHaveLength(2)
  })
})