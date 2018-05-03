import React, { Component } from 'react'
// import { PageTitle } from '../../Lib/Common/Views'
import SignUpForm from '../../Redux/Containers/Sessions/SignUp'

export default class SignUp extends Component{
	render() {
		return (
			<div className='sign-up-view'>
				<SignUpForm location={this.props.location} />
        <center><p>Already have an Account? <a href='/sign-in'>Sign in with your Account</a></p></center>
			</div>
			)
	}
}