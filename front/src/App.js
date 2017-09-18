import React, { Component } from 'react'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null
    }
    this.url = 'https://speak-your-mind.herokuapp.com/'
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
        <Navbar token={this.state.token} deleteToken={this.deleteToken.bind(this)} url={this.url} />
        <Main token={this.state.token} saveToken={this.saveToken.bind(this)} url={this.url} />
      </div>
    )
  }
}

export default App
