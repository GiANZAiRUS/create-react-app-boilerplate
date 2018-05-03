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
      
      <p>Eto yung pinush ko</p>
      </div>
    )
  }
  biboy pogi
}
