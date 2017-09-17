/* global  */

import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'

class Main extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' render={() => <Home token={this.props.token} />} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/login' render={() => <Login saveToken={this.props.saveToken} />} />
        </Switch>
      </main>
    )
  }
}

export default Main
