import React from 'react'
import Pagination from './'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'

describe('BookStore', () => {
  it('renders correctly', () => {
    const PaginationTree = renderer.create(
      <Pagination currentPage={0} pageCount={0} onPageChange={() => ''} />
    ).toJSON()
    expect(PaginationTree).toMatchSnapshot()
  })

  it('should render zero pages', () => {
    const wrapper = mount(<Pagination currentPage={0} pageCount={0} onPageChange={() => ''} />)
    expect(wrapper.find('.c-pagination__page')).toHaveLength(0)
  })

  it('should render some pages', () => {
    const wrapper = mount(<Pagination currentPage={0} pageCount={5} onPageChange={() => ''} />)
    expect(wrapper.find('.c-pagination__page')).toHaveLength(5)
    expect(wrapper.find('.c-pagination__page').first().hasClass('c-pagination__page--current')).toEqual(true)
  })

  it('should call onPageChange when some page is clicked', () => {
    const pageButtonSpy = jest.fn()
    const wrapper = mount(<Pagination currentPage={0} pageCount={5} onPageChange={pageButtonSpy} />)
    const secondPageButton = wrapper.find('.c-pagination__page > a').at(1)

    secondPageButton.simulate('click', 1)

    expect(pageButtonSpy).toHaveBeenCalledTimes(1)
    expect(pageButtonSpy).toHaveBeenCalledWith(1)
  })

  it('should block onPageChange when currentPage button is clicked', () => {
    const pageButtonSpy = jest.fn()
    const wrapper = shallow(<Pagination currentPage={0} pageCount={5} onPageChange={pageButtonSpy} />)
    const secondPageButton = wrapper.find('.c-pagination__page > a').at(0)

    secondPageButton.simulate('click', 1)

    expect(pageButtonSpy).toHaveBeenCalledTimes(0)
  })
})