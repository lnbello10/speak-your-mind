/* global  */

import React, {Component} from 'react'

class Home extends Component {
  render () {
    return (
      <div>
        <div className='jumbotron'>
          <h1>Speak Your Mind </h1>
          <p>Shortening distances through the world wide web.
          We are an open multilingual community of people who discuss daily topics and about anything one can come in mind.
          The meaning is not entirely our focus, but the media. You can start by browsing some of the lobbys available or
          add a comment to a conversation you like by <a href='#login'>logging in</a> or <a href='#signUp'>signing up</a> for free!</p>
        </div>

        <blockquote>
          <p>To have another language is to possess a second soul.</p>
          <small><cite title='Source Title'>Charlemagne</cite></small>
        </blockquote>

        <h2 style={{textAlign: 'center'}}>What would you like to do?</h2>
        <div>
          <h3>- Start writting in:</h3>
          <div className='row'>
            <div className='jumbotron col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <h2 style={{textAlign: 'center'}}> <a href='#chats/english'>English</a> </h2>
            </div>
            <div className='jumbotron col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <h2 style={{textAlign: 'center'}}><a href='#chats/spanish'>Spanish</a></h2>
            </div>
            <div className='jumbotron col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12'>
              <h2 style={{textAlign: 'center'}}><a href='#chats/french'>French</a></h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
