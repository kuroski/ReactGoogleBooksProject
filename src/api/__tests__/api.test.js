import nock from 'nock'
import * as books from '../'
import booksJson from '../../test/__mocks__/books.json'
import bookJson from '../../test/__mocks__/book.json'
import {API_URL, HARRY_POTTER_URL, HARRY_POTTER_GET_URL} from '../../test/__mocks__/constants'

describe('API', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should retrieve a book list from API all() call', () => {
        const googleBooksApi = nock(API_URL)
            .get(HARRY_POTTER_URL)
            .reply(200, booksJson)
        return books.all('Harry Potter')
            .then(books => {
                expect(books).toEqual(booksJson)
                googleBooksApi.done()
            })
    })

    it('should retrieve a book from API find() call', () => {
        const googleBooksApi = nock(API_URL)
            .get(HARRY_POTTER_GET_URL)
            .reply(200, bookJson)
        return books.find(bookJson.id)
            .then(book => {
                expect(book).toEqual(bookJson)
                googleBooksApi.done()
            })
    })
})