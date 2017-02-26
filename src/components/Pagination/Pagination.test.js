import React from 'react'
import Pagination from './'
import renderer from 'react-test-renderer'

describe('BookStore', () => {
  it('renders correctly', () => {
    const PaginationTree = renderer.create(
      <Pagination />
    ).toJSON()
    expect(PaginationTree).toMatchSnapshot()
  })
})