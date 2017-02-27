import React from 'react'
import Book from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('Book', () => {
  it('renders correctly', () => {
    const BookTree = renderer.create(
      <Book bookId="001" index={0} title="Harry Potter" onFavorite={() => ''} isOnFavorite={() => ''} />
    ).toJSON()
    expect(BookTree).toMatchSnapshot()
  })

  it('should call onFavoriteBook when favorite button is clicked', () => {
    const onFavoriteBookSpy = jest.fn()
    const firstBook = booksJson.items[0]
    const wrapper = shallow(
      <Book
        bookId={firstBook.id}
        index={0}
        title={firstBook.volumeInfo.title}
        onFavorite={onFavoriteBookSpy}
        isOnFavorite={() => ''} />)
    const firstFavoriteButton = wrapper.find('.c-book__favorite').first()

    firstFavoriteButton.simulate('click', firstBook.id, 0)

    expect(onFavoriteBookSpy).toHaveBeenCalledTimes(1)
    expect(onFavoriteBookSpy).toHaveBeenCalledWith(firstBook.id, 0)
  })

  it('should check if the book is favorited', () => {
    const isOnFavorite = jest.fn()
    const wrapper = shallow(<Book bookId="001" index={0} title="Harry Potter" onFavorite={() => ''} isOnFavorite={isOnFavorite} />)

    expect(isOnFavorite).toHaveBeenCalledTimes(1)
    expect(isOnFavorite).toHaveBeenLastCalledWith(wrapper.instance().props.bookId)
  })

  it('should hide the favorite button when the book is in favorites list', () => {
    const isOnFavorite = jest.fn().mockReturnValueOnce(true)
    const wrapper = shallow(<Book bookId="001" index={0} title="Harry Potter" onFavorite={() => ''} isOnFavorite={isOnFavorite} />)

    expect(wrapper.hasClass('c-book--favorited')).toBe(true)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
  })
})