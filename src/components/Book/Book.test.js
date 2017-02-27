import React from 'react'
import Book from './'
import renderer from 'react-test-renderer'

describe('Book', () => {
  it('renders correctly', () => {
    const BookTree = renderer.create(
      <Book />
    ).toJSON()
    expect(BookTree).toMatchSnapshot()
  })
})