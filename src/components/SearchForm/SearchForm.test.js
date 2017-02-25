import React from 'react'
import SearchForm from './'
import renderer from 'react-test-renderer'

describe('SearchForm', () => {
  it('renders correctly', () => {
    const SearchFormTree = renderer.create(
      <SearchForm onSubmit={() => ''} />
    ).toJSON()
    expect(SearchFormTree).toMatchSnapshot()
  })
})