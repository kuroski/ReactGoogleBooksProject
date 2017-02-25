import React from 'react'
import SearchForm from './'
import renderer from 'react-test-renderer'

describe('SearchForm', () => {
  it('renders correctly', () => {
    const SearchFormTree = renderer.create(
      <SearchForm />
    ).toJSON()
    expect(SearchFormTree).toMatchSnapshot()
  })
})