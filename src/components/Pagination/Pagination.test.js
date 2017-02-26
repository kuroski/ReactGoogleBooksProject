import React from 'react'
import Pagination from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('BookStore', () => {
  it('renders correctly', () => {
    const PaginationTree = renderer.create(
      <Pagination currentPage={0} pageCount={0} onPageChange={() => ''} />
    ).toJSON()
    expect(PaginationTree).toMatchSnapshot()
  })

  it('should show pages elements', () => {
    const wrapper = shallow(<Pagination currentPage={0} pageCount={10} onPageChange={() => ''} />)
    expect(wrapper.find('.c-pagination__page')).toHaveLength(10)
    expect(wrapper.find('.c-pagination__page').first().hasClass('c-pagination__page--current')).toEqual(true)
  })
})