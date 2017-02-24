import React from 'react';
import BookStore from './BookStore';
import renderer from 'react-test-renderer';

describe('BookStore', () => {
  it('renders correctly', () => {
    const BookStoreTree = renderer.create(
      <BookStore />
    ).toJSON();
    expect(BookStoreTree).toMatchSnapshot();
  });
})
