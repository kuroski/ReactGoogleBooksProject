const PER_PAGE = 10
export const API_URL = 'https://www.googleapis.com/books/v1'
export const HARRY_POTTER_URL = `/volumes?q=Harry%20Potter&maxResults=${PER_PAGE}&startIndex=0`
export const HARRY_POTTER_URL_SECOND_PAGE = `/volumes?q=Harry%20Potter&maxResults=${PER_PAGE}&startIndex=1`
export const BOOKS_PER_PAGE = PER_PAGE