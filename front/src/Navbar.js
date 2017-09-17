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
            <li className='active'><a href='#home'>Home</a></li>
            <li className='dropdown'>
              <a className='dropdown-toggle' data-toggle='dropdown'>Languages<span className='caret' /></a>
              <ul className='dropdown-menu'>
                <li><a href='#a'>Page 1-1</a></li>
                <li><a href='#b'>Page 1-2</a></li>
                <li><a href='#c'>Page 1-3</a></li>
              </ul>
            </li>
            <li><a href='#about'>About</a></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><a href='#signUp'><span className='glyphicon glyphicon-user' /> Sign Up</a></li>
            <li><a href='#login'><span className='glyphicon glyphicon-log-in' /> Login</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
