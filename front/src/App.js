import React, { Component } from 'react'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: ''
    }
  }

  saveToken (token) {
    this.setState({token: token})
  }

  render () {
    return (
      <div>
        <Navbar />
        <Main token={this.state.token} saveToken={this.saveToken.bind(this)} />
      </div>
    )
  }
}

export default App
