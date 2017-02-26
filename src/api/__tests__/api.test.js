import nock from 'nock'
import * as books from '../'
import booksJson from '../../test/__mocks__/books.json'

const API_URL = 'https://www.googleapis.com/books/v1'

describe('API', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should retrieve a book list from API call', () => {
        const googleBooksApi = nock(API_URL)
            .get('/volumes?q=Harry%20Potter')
            .reply(200, booksJson)
        return books.all('Harry Potter')
            .then((books) => {
                expect(books).toEqual(booksJson)
                googleBooksApi.done()
            })
    })
})