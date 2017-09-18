import React, { Component } from 'react'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null
    }
  }

  saveToken (token) {
    this.setState({token: token})
  }

  deleteToken () {
    this.setState({
      token: null
    })
  }

  render () {
    return (
      <div>
        <Navbar token={this.state.token} deleteToken={this.deleteToken.bind(this)} />
        <Main token={this.state.token} saveToken={this.saveToken.bind(this)} />
      </div>
    )
  }
}

export default App
