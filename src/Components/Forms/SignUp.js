import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import Form from 'react-jsonschema-form'
import Alert from '../Alert'
import Axios from '../../Lib/Common/Axios'
import * as FormHelper from '../../Lib/Helpers/Form'
import * as Session from '../../Lib/Helpers/Session'
import PisaraLogo from '../../Assets/Images/pisara-logo-with-text.png'
import _ from 'lodash'

export default class SignUp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			key: Date.now(),
			formData: initFormData,
			alertMessage: {},
			showAlertMessage: false,
			isSigningUp: false,
			redirect: '/',
			locationState: props.location.state
		}
	}
  onChange({ formData }){
    this.setState({
      formData
    })
  }

  onSubmit({ formData }) {
    this.setState({
      key: Date.now(),
      formData: formData,
      alertMessage: {
        type: 'info',
        message: 'Signing up...'
      },
      isSigningUp: true,
      showAlertMessage: true
    })

    const token = JWT.sign(formData, process.env.REACT_APP_API_JWT_SECRET)
    Axios
      .post(process.env.REACT_APP_API_SIGN_UP_URL, { token })

      .then(response => {
        const { token, redirect } = response.data


        this.setState({
          alertMessage: {
            type: 'success',
            message: 'Sign up successful'
          },
          redirect: redirect ? redirect : this.state.redirect
        })

        if (!this.state.locationState && redirect && redirect.indexOf('http') === 0)
          return window.location.href = redirect

        const _this = this

        setTimeout(function(){
          _this.setState({
            formData: initFormData,
            isSigningUp: false
          })
        }, 500)
      })
      .catch(error => {
        let message  = 'Unable to process your request. Please check your internet connection. If problem persists, contact support.'

        if (error.response && error.response.data.message)
          message = error.response.data.message

        console.log('Error: ', error)

        this.setState({
          alertMessage: {
            type: 'danger',
            message: message
          },
          showAlertMessage: true,
          isSigningUp: false
        })
      })
  }

	render() {

	    if (Session.token() && this.props.IsSignedIn) {
	      const locationState = this.state.locationState
	      let referrer = this.state.redirect;

	      if (locationState && locationState.from) {
	        const { pathname, search } = locationState.from
	        referrer = [pathname, search].join('')
	      }

	      return <Redirect to={referrer} />
	    }

		return(

			<div className ='form-wrapper'>
				<img src={PisaraLogo}  alt="Pisara Logo" />
		        {this.state.showAlertMessage &&
		          <Alert type={this.state.alertMessage.type} hideDismissButton>
		            <p>{this.state.alertMessage.message}</p>
		          </Alert>
		        }
				<Form
					className='form form-group'
					autocomplete='off'
					key={this.state.key}
					formData={this.state.formData}
					schema={schema}
					uiSchema={UISchema}
					validate={validate}
	        ErrorList={FormHelper.errorList}
          onSubmit={this.onSubmit.bind(this)}

					onChange={this.onChange.bind(this)}
				>

				<button className='btn form-control' disabled={this.state.isSigningUp}>Register </button>
				<p>By clicking Register I agree to Pisara's<br></br><a>Terms & Condtions</a> and <a>Privacy Policy</a></p>

				</Form>
			</div>
			)
	}
}
const ROLES = [
  {name: 'Learner', value: 4},
  {name: 'Instructor', value: 5}
]

const initFormData = {
	'firstName': '',
	'lastName': '',
	'email': '',
	'password': ''
}
const schema = {
	'title': 'Create an Account',
	'type': 'object',
	'properties':{
    role:{
      type: 'number',
      title: 'Role',
      enum: _.map(ROLES, 'value'),
      enumNames:_.map(ROLES, 'name')
    },
		'firstName':{
			'type': 'string',
			'title': 'First Name'
		},
		'lastName':{
			'type': 'string',
			'title': 'Last Name'
		},
		'email':{
			type: 'string',
			title: 'Email'
		},
		'password':{
			'type': 'string',
			'title': 'Password'
		}
	}


}


const UISchema ={
	'ui:rootFieldId': 'sign_up',


  'role': {
    'ui:widget': 'select',
    'ui:placeholder': 'Role*',
    'ui:options': {
      'label': false
    }
  },
	'firstName':{
		'ui:widget': 'text',
		'ui:placeholder': 'First Name*',
		'ui:options':{
			'label': false
		},
	},
	'lastName':{
		'ui:widget': 'text',
		'ui:placeholder': 'Last Name*',
		'ui:options':{
			'label': false
		}
	},
	'email':{
		'ui:widget': 'email',
		'ui:placeholder': 'Email*',
		'ui:options':{
			'label': false
		}
	},
	password:{
		'ui:widget': 'password',
		'ui:placeholder': 'Password*',
		'ui:options':{
			'label': false
		}
	}


}







function validate(formData, errors) {
  let input

  if (formData.role === undefined || formData.role === '') {
    errors.role.addError('Role is required.')
    input = 'role'
  }

  if (formData.firstName === undefined || formData.firstName === '') {
    errors.firstName.addError('First Name is required.')
    input = 'firstName'
  }

  if (formData.lastName === undefined || formData.lastName === '') {
    errors.lastName.addError('Last Name is required.')
    input = 'lastName'
  }
  if (formData.email === undefined || formData.email === '') {
    errors.email.addError('Email is required.')
    input = 'email'
  }
  if (formData.password === undefined || formData.password === '') {
    errors.password.addError('Password is required.')
    input = 'password'
  }



  FormHelper.setFocus(UISchema, input)

  return errors
}
