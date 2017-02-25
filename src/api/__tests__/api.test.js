import nock from 'nock'
import * as books from '../'
import booksJson from './books.json'

const API_URL = 'https://www.googleapis.com/books/v1'

describe('API', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should retrieve a book list from API call', () => {
        const googleBooksApi = nock(API_URL)
            .get('/volumes?q=Harry%20Potter&maxResults=2')
            .reply(200, booksJson);
        return books.all('Harry Potter', 2)
            .then((books) => {
                expect(books).toEqual(booksJson)
                googleBooksApi.done()
            })
    })
})