/* global  */

import React, {Component} from 'react'

class Navbar extends Component {
  render () {
    return (
      <nav className='navbar navbar-inverse'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#home'>SpeakYourMind</a>
          </div>
          <ul className='nav navbar-nav'>
            <li className='dropdown'>
              <a className='dropdown-toggle' data-toggle='dropdown'>Languages<span className='caret' /></a>
              <ul className='dropdown-menu'>
                <li className='a-dropdown'><a href='#chats/spanish'>Spanish</a></li>
                <li className='a-dropdown'><a href='#chats/english'>English</a></li>
                <li className='a-dropdown'><a href='#chats/french'>French</a></li>
              </ul>
            </li>
            <li><a href='#about'>About</a></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            {!this.props.token && <li><a href='#signUp'><span className='glyphicon glyphicon-user' />Sign Up</a></li>}
            {!this.props.token && <li><a href='#login'><span className='glyphicon glyphicon-log-in' />Login</a></li>}
            { this.props.token && <li><a href='#logout'><span className='glyphicon glyphicon-log-in' />Logout</a></li>}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
