import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  renderMessage () {
    return this.props.messages.map(message => {
      return <Message key={message.date} message={message} />
    })
  }

  render () {
    return (
      <div>
        {this.renderMessage()}
      </div>
    )
  }
}

export default MessageList
