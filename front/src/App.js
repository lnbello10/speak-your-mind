import React, { Component } from 'react'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null
    }
    this.url = 'https://speak-your-mind.herokuapp.com/'
    // this.url = 'http://localhost:3000/'
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
        <Navbar token={this.state.token} />
        <div className='main'>
          <Main token={this.state.token} saveToken={this.saveToken.bind(this)} deleteToken={this.deleteToken.bind(this)} url={this.url} />
        </div>
      </div>
    )
  }
}

export default App
