import React from 'react'
import BookShelf from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={[]} />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={[]} />)
    expect(wrapper.find('.c-book')).toHaveLength(0)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
  })

  it('should render some books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} isOnFavorite={() => ''} books={booksJson.items} />)
    expect(wrapper.find('.c-book')).toHaveLength(2)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(2)
  })

  it('should call onFavoriteBook when favorite button is clicked', () => {
    const onFavoriteBookSpy = jest.fn()
    const firstBookId = booksJson.items[0].id
    const wrapper = shallow(<BookShelf onFavorite={onFavoriteBookSpy} isOnFavorite={() => ''} books={booksJson.items} />)
    const firstFavoriteButton = wrapper.find('.c-book__favorite').first()

    firstFavoriteButton.simulate('click', firstBookId, 0)

    expect(onFavoriteBookSpy).toHaveBeenCalledTimes(1)
    expect(onFavoriteBookSpy).toHaveBeenCalledWith(firstBookId, 0)
  })

  it('should call isOnFavorite when looping through books', () => {
    const isOnFavorite = jest.fn()
    shallow(<BookShelf onFavorite={() => ''} isOnFavorite={isOnFavorite} books={booksJson.items} />)

    expect(isOnFavorite).toHaveBeenCalledTimes(2)
    expect(isOnFavorite).toHaveBeenLastCalledWith(booksJson.items[1].id)
  })

  it('should hide the favorite button when the books is in favorites list', () => {
    const isOnFavorite = jest.fn().mockReturnValueOnce(true)
    const wrapper = shallow(<BookShelf onFavorite={() => ''} isOnFavorite={isOnFavorite} books={booksJson.items} />)
    const firstFavoriteBook = wrapper.find('.c-book').at(0)

    expect(firstFavoriteBook.hasClass('c-book--favorited')).toBe(true)
    expect(firstFavoriteBook.find('.c-book__favorite')).toHaveLength(0)
  })
})