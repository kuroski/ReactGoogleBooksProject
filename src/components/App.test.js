import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import localStorageMock from '../test/__mocks__/localStorage'

describe('App', () => {
  beforeEach(() => {
    window.localStorage = localStorageMock
  })

  afterEach(() => {
      window.localStorage.clear()
  })

  it('renders correctly', () => {
    const AppTree = renderer.create(
      <App />
    ).toJSON()
    expect(AppTree).toMatchSnapshot()
  })

  it('should initialize the default favorite books list in localStorage', () => {
    shallow(<App />)
    expect(window.localStorage.getItem('favoritedBooks')).toBeDefined()
  })
})
