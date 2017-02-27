import request from 'superagent'

const API_URL = 'https://www.googleapis.com/books/v1'

export function all(term, page = 0) {
    return request.get(`${API_URL}/volumes`)
        .query({
            q: term,
            maxResults: 10,
            startIndex: page
        })
        .then(result => {
            return result.body
        })
        .catch(error => {
            throw new Error(error)
        })
}

export function find(bookId) {
    return request.get(`${API_URL}/volumes/${bookId}`)
        .then(result => {
            return result.body
        })
        .catch(error => {
            throw new Error(error)
        })
}