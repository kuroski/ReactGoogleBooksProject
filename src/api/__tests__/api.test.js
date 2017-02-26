import nock from 'nock'
import * as books from '../'
import booksJson from '../../test/__mocks__/books.json'
import {API_URL, HARRY_POTTER_URL} from '../../test/__mocks__/constants'

describe('API', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should retrieve a book list from API call', () => {
        const googleBooksApi = nock(API_URL)
            .get(HARRY_POTTER_URL)
            .reply(200, booksJson)
        return books.all('Harry Potter')
            .then((books) => {
                expect(books).toEqual(booksJson)
                googleBooksApi.done()
            })
    })
})