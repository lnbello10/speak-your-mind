/* global fetch, alert */

import React, {Component} from 'react'
import MessageList from './MessageList'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chat: {
        messages: []
      },
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    try {
      let response = await fetch(this.props.url + 'chats/' + this.props.language + '/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        body: JSON.stringify({
          text: this.state.message
        })
      })
      if (response.status === 200) {
        alert('Sent')
      } else if (response.status === 401) {
        alert('Log in first')
      } else {
        throw new Error('Respuesta por parte del servidor no manejada en el front')
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  handleInputChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div>
        {this.props.token &&
        <form className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label col-sm-2'>New Message:</label>
            <div className='col-sm-10'>
              <textarea name='message' type='text' className='form-control' value={this.state.newMessage} onChange={this.handleInputChange} rows='4' placeholder='Type text' />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-default'>Send</button>
            </div>
          </div>
        </form>
      }
        {!this.props.token && <h1>Register or login to start speaking your mind!</h1>}
        <MessageList messages={this.state.chat.messages} />
      </div>
    )
  }

  async componentDidMount () {
    try {
      let response = await fetch(this.props.url + 'chats/' + this.props.language, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        }
      })
      if (response.status === 200 || response.status === 304) {
        let chat = await response.json()
        this.setState({
          chat: chat
        })
      } else {
        let error = await response.text()
        console.log(error)
        throw new Error('Respuesta por parte del servidor no manejada en el front')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default Chat
