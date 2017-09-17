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
      let response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
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
        alert('Creado el usuario')
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
      <form className='form-horizontal' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label class='control-label col-sm-2' for='email'>Email</label>
          <div className='col-sm-10'>
            <input id='email' name='email' type='email' className='form-control' value={this.state.email} onChange={this.handleInputChange} placeholder='Enter email' />
          </div>
        </div>
        <div className='form-group'>
          <label class='control-label col-sm-2' for='password'>Pssword</label>
          <div className='col-sm-10'>
            <input id='password' name='password' type='password' className='form-control' value={this.state.password} onChange={this.handleInputChange} placeholder='Enter password' />
          </div>
        </div>
        <div class='form-group'>
          <div class='col-sm-offset-2 col-sm-10'>
            <button type='submit' class='btn btn-default'>Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Register
