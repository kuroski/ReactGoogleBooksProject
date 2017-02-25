import request from 'superagent'

const API_URL = 'https://www.googleapis.com/books/v1'

export function all(term, maxResults) {
    return request.get(`${API_URL}/volumes`)
        .query({
            q: term,
            maxResults: maxResults
        }).then((result) => {
            return result.body
        })
}