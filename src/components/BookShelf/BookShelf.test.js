import React from 'react'
import BookShelf from './'
import renderer from 'react-test-renderer'

describe('BookShelf', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(
      <BookShelf />
    ).toJSON()
    expect(BookShelfTree).toMatchSnapshot()
  })
})