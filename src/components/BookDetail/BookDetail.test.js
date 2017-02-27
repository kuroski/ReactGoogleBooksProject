import React from 'react'
import BookDetail from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('Book', () => {
  it('renders correctly', () => {
    const BookDetailTree = renderer.create(
      <BookDetail />
    ).toJSON()
    expect(BookDetailTree).toMatchSnapshot()
  })
})