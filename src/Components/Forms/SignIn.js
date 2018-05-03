import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import Form from 'react-jsonschema-form'
import Alert from '../Alert'
import Axios from '../../Lib/Common/Axios'
import * as FormHelper from '../../Lib/Helpers/Form'
import * as Session from '../../Lib/Helpers/Session'
import PisaraLogo from '../../Assets/Images/pisara-logo-with-text.png'


export default class SignIn extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      key: Date.now(),
      formData: initFormData,
      alertMessage: {},
      showAlertMessage: false,
      isSigningIn: false,
      redirect: '/',
      locationState: props.location.state
    }
  }

  onSubmit({ formData }) {
    this.setState({
      key: Date.now(),
      formData: formData,
      alertMessage: {
        type: 'info',
        message: 'Signing in...'
      },
      isSigningIn: true,
      showAlertMessage: true
    })

    const token = JWT.sign(formData, process.env.REACT_APP_API_JWT_SECRET)

    Axios
      .post(process.env.REACT_APP_API_SIGN_IN_URL, { token })
      .then(response => {
        const { token, redirect } = response.data

        Session.store({ token })

        this.setState({
          alertMessage: {
            type: 'success',
            message: 'Redirecting...'
          },
          redirect: redirect ? redirect : this.state.redirect
        })

        if (!this.state.locationState && redirect && redirect.indexOf('http') === 0)
          return window.location.href = redirect

        const _this = this

        setTimeout(function(){
          _this.setState({
            formData: initFormData,
            isSigningIn: false
          })
          _this.props.auth(true);
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
          isSigningIn: false
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

    return (
      <div className="form-wrapper">
        <img src={PisaraLogo}  alt="Pisara Logo" className="pisara-logo-with-text" />
        {this.state.showAlertMessage &&
          <Alert type={this.state.alertMessage.type} hideDismissButton>
            <p>{this.state.alertMessage.message}</p>
          </Alert>
        }
        <Form
          className="form"
          autocomplete="off"
          key={this.state.key}
          formData={this.state.formData}
          schema={Schema}
          uiSchema={UISchema}
          validate={validate}
          ErrorList={FormHelper.errorList}
          onSubmit={this.onSubmit}
          widgets={widgets}
        >
          <button
            type="button"
            href=""
            className="btn btn-link pull-left"
          >
            Forgot your password?
          </button>
          <button
            type="submit"
            className="btn pull-right"
            disabled={this.state.isSigningIn}
          >
            Sign In
          </button>
        </Form>
      </div>
    )
  }
}

const customWidget = (props) => {
  const {id, value, autofocus, disabled, options, readonly, required, placeholder} = props
  const {icon, type, className} = options
  return(
    <div className="input-group input-group-lg">
      <span className="input-group-addon"><i className={icon}></i></span>
      <input type={type}
            id={id}
            className={className}
            name={id}
            value={value}
            required={required}
            readOnly={readonly}
            disabled={disabled}
            placeholder={placeholder}
            autoFocus={autofocus}
            onChange={(e) => props.onChange(e.target.value)}
            >
      </input>
    </div>
    )
}
const widgets = {
  customWidget: customWidget
}
const initFormData = {
  email: '',
  password: '',
  test: 'asd'
}

const Schema = {
  'type': 'object',
  'title': 'Sign in with your Account',
  'properties': {
    'email': {
      'type': 'string',
      'title': 'Email'
    },
    'password': {
      'type': 'string',
      'title': 'Password'
    }
  }
}

const UISchema = {
  'ui:rootFieldId': 'log_in',
  'email': {
    'ui:widget': 'customWidget',
    'ui:autofocus': true,
    'ui:placeholder': 'Enter your email',
    'ui:options': {
      'label': false,
      'icon': 'fa fa-user',
      'type': 'email',
      'className': 'form-control'
    }
  },
  'password': {
    'ui:widget': 'customWidget',
    'ui:placeholder': 'Enter your password',
    'ui:options': {
      'label': false,
      'icon': 'fa fa-lock',
      'type': 'password',
      'className': 'form-control'

    }
  }
}

function validate(formData, errors) {
  let input

  if (formData.email === undefined || formData.email === '') {
    errors.email.addError('Email is required.')
    input = 'email'
  }

  if (formData.password === undefined || formData.password === '') {
    errors.password.addError('Password is required.')
    input = input || 'password'
  }

  FormHelper.setFocus(UISchema, input)

  return errors
}
