import React from 'react'
import BookShelf from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf onFavorite={() => ''} books={[]} />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} books={[]} />)
    expect(wrapper.find('.c-book')).toHaveLength(0)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(0)
  })

  it('should render some books', () => {
    const wrapper = shallow(<BookShelf onFavorite={() => ''} books={booksJson.items} />)
    expect(wrapper.find('.c-book')).toHaveLength(2)
    expect(wrapper.find('.c-book__favorite')).toHaveLength(2)
  })

  it('should call onFavoriteBook when favorite button is clicked', () => {
    const onFavoriteBookSpy = jest.fn()
    const firstBookId = booksJson.items[0].id
    const wrapper = shallow(<BookShelf onFavorite={onFavoriteBookSpy} books={booksJson.items} />)
    const firstFavoriteButton = wrapper.find('.c-book__favorite').first()

    firstFavoriteButton.simulate('click', firstBookId)

    expect(onFavoriteBookSpy).toHaveBeenCalledTimes(1)
    expect(onFavoriteBookSpy).toHaveBeenCalledWith(firstBookId)
  })
})