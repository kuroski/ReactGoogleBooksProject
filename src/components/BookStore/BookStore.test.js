import React from 'react'
import BookStore from './'
import SearchForm from '../SearchForm'
import BookShelf from '../BookShelf'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('BookStore', () => {
  it('renders correctly', () => {
    const BookStoreTree = renderer.create(
      <BookStore />
    ).toJSON()
    expect(BookStoreTree).toMatchSnapshot()
  })

  it('should render a SearchForm and a BookShelf', () => {
    const wrapper = shallow(<BookStore />)
    expect(wrapper.containsAllMatchingElements([
      <SearchForm />,
      <BookShelf />
    ])).toEqual(true)
  })

  it('should start with an empty book list', () => {
    const wrapper = shallow(<BookStore />)
    expect(wrapper.state('books')).toEqual([])
  })
})
