import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class RedirectToSignIn extends Component {
  componentWillMount() {
    this.props.auth(false)
  }

  render() {
    return (
      <div>
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: this.props.location }
      }} />
      
      <p>Eto aayung pinush ko</p>
      </div>
    )
  }
<<<<<<< HEAD
  Panget ako
=======
  biboy pogi
>>>>>>> 8521b6f412bbc4f97330086f3500d254d07b01b7
}
