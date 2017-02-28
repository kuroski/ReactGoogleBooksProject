import React from 'react'
import Book from './'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'
import {Link} from 'react-router'

describe('Book', () => {
  it('renders correctly', () => {
    const BookTree = renderer.create(
      <Book bookId="001" index={0} title="Harry Potter" toggleFavorite={() => ''} isOnFavorite={() => ''} />
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
        toggleFavorite={onFavoriteBookSpy}
        isOnFavorite={() => ''}
        term="Harry Potter" />)
    const firstFavoriteButton = wrapper.find('.c-book__favorite').first()

    firstFavoriteButton.simulate('click', firstBook.id, 0)

    expect(onFavoriteBookSpy).toHaveBeenCalledTimes(1)
    expect(onFavoriteBookSpy).toHaveBeenCalledWith(firstBook.id, 0)
  })

  it('should call onFavoriteBook when unFavorite button is clicked', () => {
    const onFavoriteBookSpy = jest.fn()
    const firstBook = booksJson.items[0]
    const wrapper = shallow(
      <Book
        bookId={firstBook.id}
        index={0}
        title={firstBook.volumeInfo.title}
        toggleFavorite={onFavoriteBookSpy}
        isOnFavorite={() => ''}
        term="Harry Potter" />)
    const firstFavoriteButton = wrapper.find('.c-book__favorite').first()
    firstFavoriteButton.simulate('click', firstBook.id, 0)

    wrapper.update()
    const firstUnFavoriteButton = wrapper.find('.c-book__unfavorite').first()
    firstUnFavoriteButton.simulate('click', firstBook.id, 0)

    expect(onFavoriteBookSpy).toHaveBeenCalledTimes(1)
    expect(onFavoriteBookSpy).toHaveBeenCalledWith(firstBook.id, 0)
  })

  it('should check if the book is favorited', () => {
    const isOnFavorite = jest.fn()
    const wrapper = shallow(<Book bookId="001" index={0} title="Harry Potter" toggleFavorite={() => ''} isOnFavorite={isOnFavorite} term="Harry Potter" />)

    expect(isOnFavorite).toHaveBeenCalledTimes(1)
    expect(isOnFavorite).toHaveBeenLastCalledWith(wrapper.instance().props.bookId)
  })

  it('should hide the favorite button when the book is in favorites list', () => {
    const isOnFavorite = jest.fn().mockReturnValueOnce(true)
    const wrapper = shallow(<Book bookId="001" index={0} title="Harry Potter" toggleFavorite={() => ''} isOnFavorite={isOnFavorite} term="Harry Potter" />)

    expect(wrapper.hasClass('c-book--favorited')).toBe(true)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
    expect(wrapper.find('.c-book__unfavorite')).toHaveLength(1)
  })

  it('should hide the unfavorite button when the book is not in the favorites list', () => {
    const isOnFavorite = jest.fn().mockReturnValueOnce(false)
    const wrapper = shallow(<Book bookId="001" index={0} title="Harry Potter" toggleFavorite={() => ''} isOnFavorite={isOnFavorite} term="Harry Potter" />)

    expect(wrapper.hasClass('c-book--favorited')).toBe(false)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(1)
    expect(wrapper.find('.c-book__unfavorite')).toHaveLength(0)
  })

  it('should render a link to book details', () => {
    const wrapper = mount(<Book term="Harry Potter" bookId={booksJson.items[0].id} index={0} title="Harry Potter" toggleFavorite={() => ''} isOnFavorite={() => ''} />)
    expect(wrapper.containsAllMatchingElements([
      <Link to={`/${booksJson.items[0].id}`}>Detail</Link>,
    ])).toEqual(true)
  })

  it('should highlight the searched word', () => {
    const wrapper = mount(<Book term="Harry Potter" bookId={booksJson.items[0].id} index={0} title="Harry Potter e a Pedra Filosofal" toggleFavorite={() => ''} isOnFavorite={() => ''} />)
    expect(wrapper.find('.Highlight')).toHaveLength(1)
  })
})