import React from 'react'
import SearchForm from './'
import Input from './Input'
import Button from './Button'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'

describe('SearchForm', () => {
  it('renders correctly', () => {
    const SearchFormTree = renderer.create(
      <SearchForm onSubmit={() => ''} />
    ).toJSON()
    expect(SearchFormTree).toMatchSnapshot()
  })

  it('should contain an input and a button', () => {
    const wrapper = shallow(<SearchForm onSubmit={() => ''} />)
    expect(wrapper.containsAllMatchingElements([
      <Input />,
      <Button><i className="material-icons">search</i></Button>
    ])).toEqual(true)
  })

  it('should accept user input', () => {
    const wrapper = mount(<SearchForm onSubmit={() => ''} />)
    const input = wrapper.find('input')
    const term = 'Harry Potter'
    input.simulate('change', {target: {value: term}})
    expect(wrapper.state('term')).toEqual(term)
    expect(input.prop('value')).toEqual(term)
  })

  it('should call onSubmit when Search button is clicked', () => {
    const searchTerm = 'Harry Potter'
    const searchButtonSpy = jest.fn()
    const wrapper = shallow(<SearchForm onSubmit={searchButtonSpy} />)
    wrapper.setState({term: searchTerm})
    const searchButton = wrapper.find(Button)

    searchButton.simulate('click', new Event('Form'))

    expect(searchButtonSpy).toHaveBeenCalledTimes(1)
    expect(searchButtonSpy).toHaveBeenCalledWith(searchTerm)
  })
})