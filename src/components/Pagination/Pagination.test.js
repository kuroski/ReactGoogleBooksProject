import React from 'react'
import Pagination from './'
import renderer from 'react-test-renderer'

describe('BookStore', () => {
  it('renders correctly', () => {
    const PaginationTree = renderer.create(
      <Pagination currentPage={0} pageCount={0} onPageChange={() => ''} />
    ).toJSON()
    expect(PaginationTree).toMatchSnapshot()
  })
})