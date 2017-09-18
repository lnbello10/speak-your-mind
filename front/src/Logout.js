/* global  */

import React, {Component} from 'react'

class Logout extends Component {
  render () {
    return (
      <div>
        <h1>It is trully sad to see you leave..</h1>
      </div>
    )
  }

  componentDidMount () {
    this.props.deleteToken()
  }
}

export default Logout
