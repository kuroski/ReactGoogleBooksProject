import React, {Component} from 'react'

class App extends Component {
  componentWillMount() {
    if(!window.localStorage.getItem('favoritedBooks'))
      window.localStorage.setItem('favoritedBooks', JSON.stringify([]))
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default App
