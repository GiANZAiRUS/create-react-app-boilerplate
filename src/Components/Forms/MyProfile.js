import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import Axios from '../../Lib/Common/Axios'
import * as FormHelper from '../../Lib/Helpers/Form'
import * as Session from '../../Lib/Helpers/Session'


export default class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: Math.random(),
      formData: initFormData,
      data: [],
      buttonDisabled: false
    }
  }



  componentDidMount() {
    if (!Session.decodedToken()) return Session.verifyToken()

    const _this = this
    const apiURL = [process.env.REACT_APP_API_PROFILE_URL].join('/')
    const CancelToken = axios.CancelToken
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }

    Axios
      .get(apiURL, cancelTokenCallback)
      .then( ({data}) => {
        console.log(data)
        this.setState({
          formData: data
        })

      })
      .catch(error => {
        if (axios.isCancel(error)) return true

        console.log('Error: ', error)

        this.setState({ getRequestError: true })
      })
  }

  handleOnChange({ formData }){
    this.setState({
      key: Math.random(),
      formData
    })
    console.log(formData)
  }

  handleOnSubmit({ formData }){
    if (!Session.decodedToken()) return Session.verifyToken()

    const _this = this
    const CancelToken = axios.CancelToken
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }


    formData.email = formData.email.toLowerCase()


    Axios
      .post([process.env.REACT_APP_API_PROFILE_URL,formData.userId].join('/'), formData, cancelTokenCallback)
      .then(response => {
        this.setState({
          formData
        })
      })
      .catch(error => {
 
      })
  }

      // this.setState({
      //   formData
      // })    

  componentWillUnmount() {
    if (typeof(this.state.axiosCancelToken) === 'function') this.state.axiosCancelToken()

  }

  render() { 
    return (
      <div className="form-wrapper">

        
        <Form
          className="form"
          autocomplete="off"
          formData={this.state.formData}
          schema={Schema}
          uiSchema={UISchema}
          validate={validate}
          ErrorList={FormHelper.errorList}
          onChange={this.handleOnChange.bind(this)}
          onSubmit={this.handleOnSubmit.bind(this)}
        >

          <button
            type="submit"
            className="btn pull-right"
          >
            Save
          </button>
        </Form>
      </div>

    )
  }
}

const initFormData = {
  'email': '',
  'firstName': '',
  'middleName': '',
  'lastName': '',
  'birthDate': '',
  'gender': '',
  'address': '',
  'city': '',
  'postalCode': '',
  'country': ''
}


const Schema = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'title': 'Email'
    },
    'firstName': {
      'type': 'string',
      'title': 'First Name'
    },
    'middleName': {
      'type': 'string',
      'title': 'Middle Name'
    },
    'lastName': {
      'type': 'string',
      'title': 'Last Name'
    },
    'birthDate': {
      'type': 'string',
      'title': 'Birthdate',
      'format': 'date-time'
    },
    'gender': {
      'type': 'string',
      'title': 'Gender',
      'enum': ['male', 'female'],
      'enumNames': ['Male', 'Female']
    },
    'address': {
      'type': 'string',
      'title': 'Address'
    },
    'city': {
      'type': 'string',
      'title': 'City'
    },
    'postalCode': {
      'type': 'number',
      'title': 'Postal Code'
    },
    'country': {
      'type': 'string',
      'title': 'Country'
    }
  }
}

const UISchema = {
  'ui:rootFieldId': 'my_profile',
  'email': {
    'ui:widget': 'email',
    'ui:autofocus': true
  },
  'firstName': {
    'ui:widget': 'text'
  },  
  'middleName': {
    'ui:widget': 'text'
  },  
  'lastName': {
    'ui:widget': 'text'
  },  
  'birthDate': {
    'ui:widget': 'alt-date'
  },
  'gender': {
    'ui:widget': 'radio'
  },
  'address': {
    'ui:widget': 'textarea'
  },
  'city': {
    'ui:widget': 'text'
  },
  'country': {
    'ui:widget': 'text'
  }
}

function validate(formData, errors) {
  let input

  if (formData.email === undefined || formData.email === '') {
    errors.email.addError('Email is required.')
    input = 'email'
  }

  FormHelper.setFocus(UISchema, input)

  return errors
}

