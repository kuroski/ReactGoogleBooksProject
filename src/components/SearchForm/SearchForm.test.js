import React from 'react'
import SearchForm from './'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

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
})