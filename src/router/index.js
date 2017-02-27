import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from '../components/App'
import BookStore from '../components/BookStore'
import BookDetail from '../components/BookDetail'
import {addLocaleData, IntlProvider} from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import localeData from '../i18n/pt.json'

addLocaleData([...pt,])

const router = (
    <IntlProvider locale="pt" messages={localeData}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={BookStore} />
                <Route path="/:id" component={BookDetail} />
                <Route path="*" component={BookStore}/>
            </Route>
        </Router>
    </IntlProvider>
)

export default router