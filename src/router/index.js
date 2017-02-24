import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from '../components/App'
import BookStore from '../components/bookstore/BookStore'

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={BookStore} />
            <Route path="*" component={App}/>
        </Route>
    </Router>
)

export default router