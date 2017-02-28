import ReactDOM from 'react-dom'
import router from './router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css'

injectTapEventPlugin()

ReactDOM.render(
  router,
  document.getElementById('root')
)
