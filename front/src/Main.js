/* global  */

import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import Chat from './Chat'

class Main extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' render={(props) => <Home token={this.props.token} {...props} />} />
          <Route path='/signUp' render={(props) => <SignUp saveToken={this.props.saveToken} {...props} />} />
          <Route path='/login' render={(props) => <Login saveToken={this.props.saveToken} {...props} />} />
          <Route path='/chats/spanish' render={(props) => <Chat token={this.props.token} language='spanish' {...props} />} />
          <Route path='/chats/english' render={(props) => <Chat token={this.props.token} language='english' {...props} />} />
          <Route path='/chats/french' render={(props) => <Chat token={this.props.token} language='french' {...props} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
