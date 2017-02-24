import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from '../components/App'

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="*" component={App}/>
        </Route>
    </Router>
)

export default router