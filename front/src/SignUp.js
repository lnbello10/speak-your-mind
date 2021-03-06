/* global fetch, alert */

import React, {Component} from 'react'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    try {
      let response = await fetch(this.props.url + 'users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      if (response.status === 460) {
        alert('Ya existe un usuario con ese correo')
      } else if (response.status === 200) {
        let token = await response.text()
        this.props.saveToken(token)
        alert('Created user and logged in')
        this.props.history.push('home')
      } else throw new Error('Respuesta por parte del servidor no manejada en el front')
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
        <div className='alert alert-dismissible alert-warning'>
          <button type='button' className='close' data-dismiss='alert'>&times;</button>
          <h4>Warning!</h4>
          <p>By continuing you are definitelly coming out from your confort-zone.</p>
        </div>
        <h1>Join Our Comunity</h1>
        <form className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label col-sm-2'>Email</label>
            <div className='col-sm-10'>
              <input name='email' type='email' className='form-control' value={this.state.email} onChange={this.handleInputChange} placeholder='Enter email' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2'>Password</label>
            <div className='col-sm-10'>
              <input name='password' type='password' className='form-control' value={this.state.password} onChange={this.handleInputChange} placeholder='Enter password' />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-default'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
