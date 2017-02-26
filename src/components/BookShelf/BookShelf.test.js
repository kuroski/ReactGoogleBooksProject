import React from 'react'
import BookShelf from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import booksJson from './__mocks__/books.json'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })

  it('should render zero books', () => {
    const wrapper = shallow(<BookShelf books={[]} />)
    expect(wrapper.find('li')).toHaveLength(0)
  })

  it('should render undefined books', () => {
    const wrapper = shallow(<BookShelf books={undefined} />)
    expect(wrapper.find('li')).toHaveLength(0)
  })

  it('should render some books', () => {
    const wrapper = shallow(<BookShelf books={booksJson} />)
    expect(wrapper.find('li')).toHaveLength(2)
  })
})