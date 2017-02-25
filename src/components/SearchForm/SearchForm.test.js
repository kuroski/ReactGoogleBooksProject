import React from 'react'
import SearchForm from './'
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
      <input />,
      <button>Add</button>
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
})