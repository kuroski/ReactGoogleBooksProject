import booksJson from './books.json'
const PER_PAGE = 10
export const API_URL = 'https://www.googleapis.com/books/v1'
export const HARRY_POTTER_URL = `/volumes?q=Harry%20Potter&maxResults=${PER_PAGE}&startIndex=0`
export const HARRY_POTTER_URL_SECOND_PAGE = `/volumes?q=Harry%20Potter&maxResults=${PER_PAGE}&startIndex=1`
export const HARRY_POTTER_GET_URL = `/volumes/${booksJson.items[0].id}`
export const HARRY_POTTER_GET_WRONG_URL = '/volumes/123'
export const BOOKS_PER_PAGE = PER_PAGE