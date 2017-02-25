import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'

describe('App', () => {
  it('renders correctly', () => {
    const AppTree = renderer.create(
      <App />
    ).toJSON()
    expect(AppTree).toMatchSnapshot()
  })
})
