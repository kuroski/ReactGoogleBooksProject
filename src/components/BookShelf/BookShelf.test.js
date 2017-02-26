import React from 'react'
import BookShelf from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from '../../test/__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf books={[]} />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf books={[]} />)
    expect(wrapper.find('li')).toHaveLength(0)
  })

  it('should render some books', () => {
    const booksItems = booksJson.items
    const wrapper = shallow(<BookShelf books={booksItems} />)
    expect(wrapper.find('li')).toHaveLength(2)
  })
})