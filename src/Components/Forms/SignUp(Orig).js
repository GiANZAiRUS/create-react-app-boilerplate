import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as Session from '../../Lib/Helpers/Session'
import PisaraLogo from '../../Assets/Images/pisara-logo-with-text.png'
import Form from 'react-jsonschema-form'
import Alert from '../Alert'
import * as FormHelper from '../../Lib/Helpers/Form'





export default class SignUp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			key: Date.now(),
			formData: initFormData,
			alertMessage: {},
			showAlertMessage: false,
			redirect: '/',
			locationState: props.location.state	
		}
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

				<Form
					className='form form-group'
					autocomplete='off'
					schema={schema}
					uiSchema={UISchema}
					formData={this.state.formData}
					validate={validate}
			          ErrorList={FormHelper.errorList}
					
					onChange={ (data) => {this.setState({formData: data.formData})}}
				>

				<button className='btn btn-submit form-control'>Register </button>
				<p>By clicking Register I agree to Pisara's<br></br><a>Terms & Condtions</a> and <a>Privacy Policy</a></p>
				
				</Form>
			</div>
			)
	}
}



const initFormData = {
	userCredentials:{
		email: '',
		password: '',
		username: ''
	},
	userType: '',
	learningPartnerProfile:{
		interests_skills: [''],
		interests_courses: [''],
		terms_and_conditions: true,
		other_known_language: ['Select other known language'],
		specialization_skills: ['Specialization Skills'],
		specialization_course: ['Specialization Courses'],
		service_offered: ['Service Offered']
	},
	individualInstructorProfile:{
		interests_skills: [''],
		interests_courses: [''],
		terms_and_conditions: true,
		other_known_language: ['Select other known language'],
		specialization_skills: ['Specialization Skills'],
		specialization_course: ['Specialization Courses'],
		service_offered: ['Service Offered']
	}
}
const schema = {
	title: 'Create an Account',
	type: 'object',
	properties: {
		userCredentials:{
			title: '',
			type: 'object',
			required: ['email','password','username'],
			properties:{
				email:{
					type: 'string',
					title: 'Email'
				},
				password:{
					type: 'string',
					title: 'Password'
				},
				username:{
					type: 'string',
					title: 'Username'
				}
			}

		},
		userType	:{
			title: 'User Type',
			type: 'string',
			enum: ['Instructor', 'Learner'],

		}
	},
	dependencies: {
		userType: {
			oneOf:[
			{
				properties: {
					userType:{
						enum: ['Instructor']
					},
					instructorAccountType:{
						title: 'Account Type',
						type: 'string',
						enum: ['learning_partner', 'individual_instructor'],
						enumNames: ['Learning Partner', 'Individual Instructor']
					}
				}
			},
			{
				properties: {
					userType:{
						enum: ['Learner']
					},
					learnerAccountType:{
						title: 'Account Type',
						type: 'string',
						enum: ['corporate_learner', 'individual_learner'],
						enumNames: ['Corporate Learner', 'Individual Learner']
					}
				}
			}
			]
		},
		instructorAccountType:{
			oneOf:[
			{
				properties:{
					instructorAccountType:{
						enum: ['learning_partner']
					},
					learningPartnerProfile:{
						title: '',
						type: 'object',
						properties:{
							first_name:{
								type: 'string',
								title: 'First Name'
							},
							middle_name:{
								type: 'string',
								title: 'Middle Name'
							},
							last_name:{
								type: 'string',
								title: 'Last Name'
							},
							birthdate:{
								type: 'string',
								title: 'Birthdate',
								format: 'date'
							},
							address1:{
								type: 'string',
								title: 'Address Line 1'
							},
							address2:{
								type: 'string',
								title: 'Address Line 2'
							},
							country:{
								type: 'string',
								title: 'Country',
								enum: ['Philippines', 'Thailand', 'Indonesia']
							},
							mobile_number:{
								type: 'integer',
								title: 'Mobile Number'
							},
							phone_number:{
								type: 'integer',
								title: 'Phone Number'
							},
							civil_status:{
								type: 'string',
								title: 'Civil Status',
								enum: ['Single', 'Married']
							},

							nationality:{
								type: 'string',
								title: 'Nationality',
								enum: [
								 'Afghan','Albanian','Algerian','American','Andorran','Angolan','Antiguans','Argentinean','Armenian','Australian','Austrian','Azerbaijani','Bahamian','Bahraini','Bangladeshi','Barbadian','Barbudans','Batswana','Belarusian','Belgian','Belizean','Beninese','Bhutanese','Bolivian','Bosnian','Brazilian','British','Bruneian','Bulgarian','Burkinabe','Burmese','Burundian','Cambodian','Cameroonian','Canadian','Cape Verdean','Central African','Chadian','Chilean','Chinese','Colombian','Comoran','Congolese','Costa Rican','Croatian','Cuban','Cypriot','Czech','Danish','Djibouti','Dominican','Dutch','East Timorese','Ecuadorean','Egyptian','Emirian','Equatorial Guinean','Eritrean','Estonian','Ethiopian','Fijian','Filipino','Finnish','French','Gabonese','Gambian','Georgian','German','Ghanaian','Greek','Grenadian','Guatemalan','Guinea-Bissauan','Guinean','Guyanese','Haitian','Herzegovinian','Honduran','Hungarian','I-Kiribati','Icelander','Indian','Indonesian','Iranian','Iraqi','Irish','Israeli','Italian','Ivorian','Jamaican','Japanese','Jordanian','Kazakhstani','Kenyan','Kittian and Nevisian','Kuwaiti','Kyrgyz','Laotian','Latvian','Lebanese','Liberian','Libyan','Liechtensteiner','Lithuanian','Luxembourger','Macedonian','Malagasy','Malawian','Malaysian','Maldivan','Malian','Maltese','Marshallese','Mauritanian','Mauritian','Mexican','Micronesian','Moldovan','Monacan','Mongolian','Moroccan','Mosotho','Motswana','Mozambican','Namibian','Nauruan','Nepalese','New Zealander','Nicaraguan','Nigerian','Nigerien','North Korean','Northern Irish','Norwegian','Omani','Pakistani','Palauan','Panamanian','Papua New Guinean','Paraguayan','Peruvian','Polish','Portuguese','Qatari','Romanian','Russian','Rwandan','Saint Lucian','Salvadoran','Samoan','San Marinese','Sao Tomean','Saudi','Scottish','Senegalese','Serbian','Seychellois','Sierra Leonean','Singaporean','Slovakian','Slovenian','Solomon Islander','Somali','South African','South Korean','Spanish','Sri Lankan','Sudanese','Surinamer','Swazi','Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Tongan','Trinidadian/Tobagonian','Tunisian','Turkish','Tuvaluan','Ugandan','Ukrainian','Uruguayan','Uzbekistani','Venezuelan','Vietnamese','Welsh','Yemenite','Zambian','Zimbabwean'
								],
							},
							primary_language:{
								type: 'string',
								title: 'Primary Language',
								enum: ['Tagalog', 'English']
							},
							other_known_language:{
								type: 'array',
								title: ' ',
								items:{
									type: 'string',
									'default': 'Select Other Known Language',
									enum: [ 'Select other known language','Tagalog', 'English']
								},
							},
							specialization_skills:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Specialization Skills',
									enum: ['Specialization Skills','Basketball', 'Billiards']
								}
							},
							specialization_course:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Specialization Courses',
									enum: ['Specialization Courses','Information technology', 'ComSci']
								}
							},
							service_offered:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Service Offered'
								}
							},
							type_of_service:{
								type: 'array',
								title: 'Type of Service',
								items:{
									type: 'string',
									enum: ['Standard', 'Custom']

								},
								uniqueItems: true
							},
							security_question1:{
								title: 'Security Question #1',
								type: 'string',
								enum: ['What is the first name of the person you first kissed?', ' What is the last name of the teacher who gave you your first failing grade?']
							},
							security_answer1:{
								title: 'Security Answer #1',
								type: 'string'
							},
							security_question2:{
								title: 'Security Question #2',
								type: 'string',
								enum: ['What was the name of your elementary / primary school?', ' What is your favorite fruit?']
							},
							security_answer2:{
								title: 'Security Answer #2',
								type: 'string'
							}
						}
					}
				}
			},
			{
				properties:{
					instructorAccountType:{
						enum: ['individual_instructor']
					},
					individualInstructorProfile:{
						title: '',
						type: 'object',
						properties:{
							first_name:{
								type: 'string',
								title: 'First Name'
							},
							middle_name:{
								type: 'string',
								title: 'Middle Name'
							},
							last_name:{
								type: 'string',
								title: 'Last Name'
							},
							birthdate:{
								type: 'string',
								title: 'Birthdate',
								format: 'date'
							},
							address1:{
								type: 'string',
								title: 'Address Line 1'
							},
							address2:{
								type: 'string',
								title: 'Address Line 2'
							},
							country:{
								type: 'string',
								title: 'Country',
								enum: ['Philippines', 'Thailand', 'Indonesia']
							},
							mobile_number:{
								type: 'integer',
								title: 'Mobile Number'
							},
							phone_number:{
								type: 'integer',
								title: 'Phone Number'
							},
							civil_status:{
								type: 'string',
								title: 'Civil Status',
								enum: ['Single', 'Married']
							},

							nationality:{
								type: 'string',
								title: 'Nationality',
								enum: [
								 'Afghan','Albanian','Algerian','American','Andorran','Angolan','Antiguans','Argentinean','Armenian','Australian','Austrian','Azerbaijani','Bahamian','Bahraini','Bangladeshi','Barbadian','Barbudans','Batswana','Belarusian','Belgian','Belizean','Beninese','Bhutanese','Bolivian','Bosnian','Brazilian','British','Bruneian','Bulgarian','Burkinabe','Burmese','Burundian','Cambodian','Cameroonian','Canadian','Cape Verdean','Central African','Chadian','Chilean','Chinese','Colombian','Comoran','Congolese','Costa Rican','Croatian','Cuban','Cypriot','Czech','Danish','Djibouti','Dominican','Dutch','East Timorese','Ecuadorean','Egyptian','Emirian','Equatorial Guinean','Eritrean','Estonian','Ethiopian','Fijian','Filipino','Finnish','French','Gabonese','Gambian','Georgian','German','Ghanaian','Greek','Grenadian','Guatemalan','Guinea-Bissauan','Guinean','Guyanese','Haitian','Herzegovinian','Honduran','Hungarian','I-Kiribati','Icelander','Indian','Indonesian','Iranian','Iraqi','Irish','Israeli','Italian','Ivorian','Jamaican','Japanese','Jordanian','Kazakhstani','Kenyan','Kittian and Nevisian','Kuwaiti','Kyrgyz','Laotian','Latvian','Lebanese','Liberian','Libyan','Liechtensteiner','Lithuanian','Luxembourger','Macedonian','Malagasy','Malawian','Malaysian','Maldivan','Malian','Maltese','Marshallese','Mauritanian','Mauritian','Mexican','Micronesian','Moldovan','Monacan','Mongolian','Moroccan','Mosotho','Motswana','Mozambican','Namibian','Nauruan','Nepalese','New Zealander','Nicaraguan','Nigerian','Nigerien','North Korean','Northern Irish','Norwegian','Omani','Pakistani','Palauan','Panamanian','Papua New Guinean','Paraguayan','Peruvian','Polish','Portuguese','Qatari','Romanian','Russian','Rwandan','Saint Lucian','Salvadoran','Samoan','San Marinese','Sao Tomean','Saudi','Scottish','Senegalese','Serbian','Seychellois','Sierra Leonean','Singaporean','Slovakian','Slovenian','Solomon Islander','Somali','South African','South Korean','Spanish','Sri Lankan','Sudanese','Surinamer','Swazi','Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Tongan','Trinidadian/Tobagonian','Tunisian','Turkish','Tuvaluan','Ugandan','Ukrainian','Uruguayan','Uzbekistani','Venezuelan','Vietnamese','Welsh','Yemenite','Zambian','Zimbabwean'
								],
							},
							primary_language:{
								type: 'string',
								title: 'Primary Language',
								enum: ['Tagalog', 'English']
							},
							other_known_language:{
								type: 'array',
								title: ' ',
								items:{
									type: 'string',
									'default': 'Select Other Known Language',
									enum: [ 'Select other known language','Tagalog', 'English']
								},
							},
							specialization_skills:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Specialization Skills',
									enum: ['Specialization Skills','Basketball', 'Billiards']
								}
							},
							specialization_course:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Specialization Courses',
									enum: ['Specialization Courses','Information technology', 'ComSci']
								}
							},
							service_offered:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Service Offered'
								}
							},
							type_of_service:{
								type: 'array',
								title: 'Type of Service',
								items:{
									type: 'string',
									enum: ['Standard', 'Custom']

								},
								uniqueItems: true
							},
							security_question1:{
								title: 'Security Question #1',
								type: 'string',
								enum: ['What is the first name of the person you first kissed?', ' What is the last name of the teacher who gave you your first failing grade?']
							},
							security_answer1:{
								title: 'Security Answer #1',
								type: 'string'
							},
							security_question2:{
								title: 'Security Question #2',
								type: 'string',
								enum: ['What was the name of your elementary / primary school?', ' What is your favorite fruit?']
							},
							security_answer2:{
								title: 'Security Answer #2',
								type: 'string'
							}
						}
					}
				}
			}
			]
		},
		learnerAccountType:{
			oneOf:[
			{
				properties:{
					learnerAccountType:{
						enum:['individual_learner']
					},
					individualLearnerProfile:{
						title: '',
						type: 'object',
						properties:{
							first_name:{
								type: 'string',
								title: 'First Name'
							},
							middle_name:{
								type: 'string',
								title: 'Middle Name'
							},
							last_name:{
								type: 'string',
								title: 'Last Name'
							},
							birthdate:{
								type: 'string',
								title: 'Birthdate',
								format: 'date'
							},
							address1:{
								type: 'string',
								title: 'Address Line 1'
							},
							address2:{
								type: 'string',
								title: 'Address Line 2'
							},
							country:{
								type: 'string',
								title: 'Country',
								enum: ['Philippines', 'Thailand', 'Indonesia']
							},
							mobile_number:{
								type: 'integer',
								title: 'Mobile Number'
							},
							phone_number:{
								type: 'integer',
								title: 'Phone Number'
							},
							civil_status:{
								type: 'string',
								title: 'Civil Status',
								enum: ['Single', 'Married']
							},

							nationality:{
								type: 'string',
								title: 'Nationality',
								enum: [
								 'Afghan','Albanian','Algerian','American','Andorran','Angolan','Antiguans','Argentinean','Armenian','Australian','Austrian','Azerbaijani','Bahamian','Bahraini','Bangladeshi','Barbadian','Barbudans','Batswana','Belarusian','Belgian','Belizean','Beninese','Bhutanese','Bolivian','Bosnian','Brazilian','British','Bruneian','Bulgarian','Burkinabe','Burmese','Burundian','Cambodian','Cameroonian','Canadian','Cape Verdean','Central African','Chadian','Chilean','Chinese','Colombian','Comoran','Congolese','Costa Rican','Croatian','Cuban','Cypriot','Czech','Danish','Djibouti','Dominican','Dutch','East Timorese','Ecuadorean','Egyptian','Emirian','Equatorial Guinean','Eritrean','Estonian','Ethiopian','Fijian','Filipino','Finnish','French','Gabonese','Gambian','Georgian','German','Ghanaian','Greek','Grenadian','Guatemalan','Guinea-Bissauan','Guinean','Guyanese','Haitian','Herzegovinian','Honduran','Hungarian','I-Kiribati','Icelander','Indian','Indonesian','Iranian','Iraqi','Irish','Israeli','Italian','Ivorian','Jamaican','Japanese','Jordanian','Kazakhstani','Kenyan','Kittian and Nevisian','Kuwaiti','Kyrgyz','Laotian','Latvian','Lebanese','Liberian','Libyan','Liechtensteiner','Lithuanian','Luxembourger','Macedonian','Malagasy','Malawian','Malaysian','Maldivan','Malian','Maltese','Marshallese','Mauritanian','Mauritian','Mexican','Micronesian','Moldovan','Monacan','Mongolian','Moroccan','Mosotho','Motswana','Mozambican','Namibian','Nauruan','Nepalese','New Zealander','Nicaraguan','Nigerian','Nigerien','North Korean','Northern Irish','Norwegian','Omani','Pakistani','Palauan','Panamanian','Papua New Guinean','Paraguayan','Peruvian','Polish','Portuguese','Qatari','Romanian','Russian','Rwandan','Saint Lucian','Salvadoran','Samoan','San Marinese','Sao Tomean','Saudi','Scottish','Senegalese','Serbian','Seychellois','Sierra Leonean','Singaporean','Slovakian','Slovenian','Solomon Islander','Somali','South African','South Korean','Spanish','Sri Lankan','Sudanese','Surinamer','Swazi','Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Tongan','Trinidadian/Tobagonian','Tunisian','Turkish','Tuvaluan','Ugandan','Ukrainian','Uruguayan','Uzbekistani','Venezuelan','Vietnamese','Welsh','Yemenite','Zambian','Zimbabwean'
								],
							},
							primary_language:{
								type: 'string',
								title: 'Primary Language',
								enum: ['Tagalog', 'English']
							},
							other_known_language:{
								type: 'array',
								title: ' ',
								items:{
									type: 'string',
									'default': 'Select Other Known Language',
									enum: [ 'Select other known language','Tagalog', 'English']
								},
							},
							interests_skills:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Interests Skills',
									enum: ['Interests Skills','Basketball', 'Billiards']
								}
							},
							interests_courses:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Interests Courses',
									enum: ['Interests Courses','Information technology', 'ComSci']
								}
							},
							type_of_service:{
								type: 'array',
								title: 'Type of Service',
								items:{
									type: 'string',
									enum: ['Standard', 'Custom']

								},
								uniqueItems: true
							},
							security_question1:{
								title: 'Security Question #1',
								type: 'string',
								enum: ['What is the first name of the person you first kissed?', ' What is the last name of the teacher who gave you your first failing grade?']
							},
							security_answer1:{
								title: 'Security Answer #1',
								type: 'string'
							},
							security_question2:{
								title: 'Security Question #2',
								type: 'string',
								enum: ['What was the name of your elementary / primary school?', ' What is your favorite fruit?']
							},
							security_answer2:{
								title: 'Security Answer #2',
								type: 'string'
							}
						}
					}
				}
			},
			{
				properties:{
					learnerAccountType:{
						enum:['corporate_learner']
					},
					corporateLearnerProfile:{
						title: '',
						type: 'object',
						properties:{
							first_name:{
								type: 'string',
								title: 'First Name'
							},
							middle_name:{
								type: 'string',
								title: 'Middle Name'
							},
							last_name:{
								type: 'string',
								title: 'Last Name'
							},
							birthdate:{
								type: 'string',
								title: 'Birthdate',
								format: 'date'
							},
							address1:{
								type: 'string',
								title: 'Address Line 1'
							},
							address2:{
								type: 'string',
								title: 'Address Line 2'
							},
							country:{
								type: 'string',
								title: 'Country',
								enum: ['Philippines', 'Thailand', 'Indonesia']
							},
							mobile_number:{
								type: 'integer',
								title: 'Mobile Number'
							},
							phone_number:{
								type: 'integer',
								title: 'Phone Number'
							},
							civil_status:{
								type: 'string',
								title: 'Civil Status',
								enum: ['Single', 'Married']
							},

							nationality:{
								type: 'string',
								title: 'Nationality',
								enum: [
								 'Afghan','Albanian','Algerian','American','Andorran','Angolan','Antiguans','Argentinean','Armenian','Australian','Austrian','Azerbaijani','Bahamian','Bahraini','Bangladeshi','Barbadian','Barbudans','Batswana','Belarusian','Belgian','Belizean','Beninese','Bhutanese','Bolivian','Bosnian','Brazilian','British','Bruneian','Bulgarian','Burkinabe','Burmese','Burundian','Cambodian','Cameroonian','Canadian','Cape Verdean','Central African','Chadian','Chilean','Chinese','Colombian','Comoran','Congolese','Costa Rican','Croatian','Cuban','Cypriot','Czech','Danish','Djibouti','Dominican','Dutch','East Timorese','Ecuadorean','Egyptian','Emirian','Equatorial Guinean','Eritrean','Estonian','Ethiopian','Fijian','Filipino','Finnish','French','Gabonese','Gambian','Georgian','German','Ghanaian','Greek','Grenadian','Guatemalan','Guinea-Bissauan','Guinean','Guyanese','Haitian','Herzegovinian','Honduran','Hungarian','I-Kiribati','Icelander','Indian','Indonesian','Iranian','Iraqi','Irish','Israeli','Italian','Ivorian','Jamaican','Japanese','Jordanian','Kazakhstani','Kenyan','Kittian and Nevisian','Kuwaiti','Kyrgyz','Laotian','Latvian','Lebanese','Liberian','Libyan','Liechtensteiner','Lithuanian','Luxembourger','Macedonian','Malagasy','Malawian','Malaysian','Maldivan','Malian','Maltese','Marshallese','Mauritanian','Mauritian','Mexican','Micronesian','Moldovan','Monacan','Mongolian','Moroccan','Mosotho','Motswana','Mozambican','Namibian','Nauruan','Nepalese','New Zealander','Nicaraguan','Nigerian','Nigerien','North Korean','Northern Irish','Norwegian','Omani','Pakistani','Palauan','Panamanian','Papua New Guinean','Paraguayan','Peruvian','Polish','Portuguese','Qatari','Romanian','Russian','Rwandan','Saint Lucian','Salvadoran','Samoan','San Marinese','Sao Tomean','Saudi','Scottish','Senegalese','Serbian','Seychellois','Sierra Leonean','Singaporean','Slovakian','Slovenian','Solomon Islander','Somali','South African','South Korean','Spanish','Sri Lankan','Sudanese','Surinamer','Swazi','Swedish','Swiss','Syrian','Taiwanese','Tajik','Tanzanian','Thai','Togolese','Tongan','Trinidadian/Tobagonian','Tunisian','Turkish','Tuvaluan','Ugandan','Ukrainian','Uruguayan','Uzbekistani','Venezuelan','Vietnamese','Welsh','Yemenite','Zambian','Zimbabwean'
								],
							},
							primary_language:{
								type: 'string',
								title: 'Primary Language',
								enum: ['Tagalog', 'English']
							},
							other_known_language:{
								type: 'array',
								title: ' ',
								items:{
									type: 'string',
									'default': 'Select Other Known Language',
									enum: [ 'Select other known language','Tagalog', 'English']
								},
							},
							interests_skills:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Interests Skills',
									enum: ['Interests Skills','Basketball', 'Billiards']
								}
							},
							interests_courses:{
								title: ' ',
								type: 'array',
								items: {
									type: 'string',
									'default': 'Interests Courses',
									enum: ['Interests Courses','Information technology', 'ComSci']
								}
							},
							type_of_service:{
								type: 'array',
								title: 'Type of Service',
								items:{
									type: 'string',
									enum: ['Standard', 'Custom']

								},
								uniqueItems: true
							},
							security_question1:{
								title: 'Security Question #1',
								type: 'string',
								enum: ['What is the first name of the person you first kissed?', ' What is the last name of the teacher who gave you your first failing grade?']
							},
							security_answer1:{
								title: 'Security Answer #1',
								type: 'string'
							},
							security_question2:{
								title: 'Security Question #2',
								type: 'string',
								enum: ['What was the name of your elementary / primary school?', ' What is your favorite fruit?']
							},
							security_answer2:{
								title: 'Security Answer #2',
								type: 'string'
							}
						}
					}
				}				
			}
			]
		}
	}
}

																																									
const UISchema ={
	"ui:rootFieldId": "myform",
	'ui:order':[
	'userType',
	'userCredentials',
	'*'
	],


	userCredentials:{
			  
		email:{
			'ui:widget': 'email',
			'ui:placeholder': 'Email*',
			'ui:options':{
				'label': false
			},
		},
		password:{
			'ui:widget': 'password',
			'ui:placeholder': 'Password*',
			'ui:options':{
				'label': false
			}
		},
		username:{
			'ui:widget': 'text',
			'ui:placeholder': 'Username*',
			'ui:options':{
				'label': false
			}
		}
	},
	userType:{

		'ui:widget': 'select',
		'ui:placeholder': 'Select User Type',
		'ui:options': {
			'label': false

		}



	},
	instructorAccountType:{
		'ui:widget': 'select',
		'ui:placeholder': 'Select Account Type',
		'ui:options':{
			'label': false
		} 
	},
	learnerAccountType:{
		'ui:widget': 'select',
		'ui:placeholder': 'Select Account Type',
		'ui:options':{
			'label': false

		} 
	},

	learningPartnerProfile:{
		first_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'First Name*',
			'ui:options':{
				'label': false
			} 
		},
		middle_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Middle Name*',
			'ui:options':{
				'label': false
			} 

		},
		last_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Last Name*',
			'ui:options':{
				'label': false
			} 

		},
		birthdate:{
			'ui:widget' : 'date',
			'ui:placeholder': 'Birthdate*',
			'ui:options':{
				'label': false
			} 

		},
		address1:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 1*',
			'ui:options':{
				'label': false
			} 

		},
		address2:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 2',
			'ui:options':{
				'label': false
			} 

		},
		country:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Country*',
			'ui:options':{
				'label': false
			} 

		},
		civil_status:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Civil Status*',
			'ui:options':{
				'label': false
			}
		},
		mobile_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Mobile Number',
			'ui:options': {
				'label': false
			}
		},
		phone_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Phone Number',
			'ui:options': {
				'label': false
			}
		},
		nationality:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Nationality',
			'ui:options': {
				'label': false
			}
		},
		primary_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Primary Language',
			'ui:options': {
				'label': false
			}
		},
		other_known_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Other Known Language',
			'ui:options': {
				'label': false,
				addable: true

			}

		},
		specialization_skills:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Specialization Skills',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		specialization_course:{
			'ui:widget' : 'select',
			'ui:placeholder': 'specialization_course',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		service_offered:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Service Offered',
			'ui:options': {
				'label': false
			}
		},
		type_of_service:{
			'ui:widget' : 'checkboxes'
		},
		security_question1:{
			'ui:widget': 'select'
		},
		security_answer1:{
			'ui:widget' : 'text'
		},
		security_question2:{
			'ui:widget': 'select'
		},
		security_answer2:{
			'ui:widget': 'text'
		}
	},
	individualInstructorProfile:{
		first_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'First Name*',
			'ui:options':{
				'label': false
			} 
		},
		middle_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Middle Name*',
			'ui:options':{
				'label': false
			} 

		},
		last_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Last Name*',
			'ui:options':{
				'label': false
			} 

		},
		birthdate:{
			'ui:widget' : 'date',
			'ui:placeholder': 'Birthdate*',
			'ui:options':{
				'label': false
			} 

		},
		address1:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 1*',
			'ui:options':{
				'label': false
			} 

		},
		address2:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 2',
			'ui:options':{
				'label': false
			} 

		},
		country:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Country*',
			'ui:options':{
				'label': false
			} 

		},
		civil_status:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Civil Status*',
			'ui:options':{
				'label': false
			}
		},
		mobile_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Mobile Number',
			'ui:options': {
				'label': false
			}
		},
		phone_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Phone Number',
			'ui:options': {
				'label': false
			}
		},
		nationality:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Nationality',
			'ui:options': {
				'label': false
			}
		},
		primary_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Primary Language',
			'ui:options': {
				'label': false
			}
		},
		other_known_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Other Known Language',
			'ui:options': {
				'label': false,
				addable: true

			}

		},
		specialization_skills:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Specialization Skills',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		specialization_course:{
			'ui:widget' : 'select',
			'ui:placeholder': 'specialization_course',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		service_offered:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Service Offered',
			'ui:options': {
				'label': false
			}
		},
		type_of_service:{
			'ui:widget' : 'checkboxes'
		},
		security_question1:{
			'ui:widget': 'select'
		},
		security_answer1:{
			'ui:widget' : 'text'
		},
		security_question2:{
			'ui:widget': 'select'
		},
		security_answer2:{
			'ui:widget': 'text'
		}
	},

	individualLearnerProfile:{
		first_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'First Name*',
			'ui:options':{
				'label': false
			} 
		},
		middle_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Middle Name*',
			'ui:options':{
				'label': false
			} 

		},
		last_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Last Name*',
			'ui:options':{
				'label': false
			} 

		},
		birthdate:{
			'ui:widget' : 'date',
			'ui:placeholder': 'Birthdate*',
			'ui:options':{
				'label': false
			} 

		},
		address1:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 1*',
			'ui:options':{
				'label': false
			} 

		},
		address2:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 2',
			'ui:options':{
				'label': false
			} 

		},
		country:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Country*',
			'ui:options':{
				'label': false
			} 

		},
		civil_status:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Civil Status*',
			'ui:options':{
				'label': false
			}
		},
		mobile_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Mobile Number',
			'ui:options': {
				'label': false
			}
		},
		phone_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Phone Number',
			'ui:options': {
				'label': false
			}
		},
		nationality:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Nationality',
			'ui:options': {
				'label': false
			}
		},
		primary_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Primary Language',
			'ui:options': {
				'label': false
			}
		},
		other_known_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Other Known Language',
			'ui:options': {
				'label': false,
				addable: true

			}

		},
		interests_skills:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Interests Skills',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		interests_courses:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Interests Courses',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		type_of_service:{
			'ui:widget' : 'checkboxes'
		},
		security_question1:{
			'ui:widget': 'select'
		},
		security_answer1:{
			'ui:widget' : 'text'
		},
		security_question2:{
			'ui:widget': 'select'
		},
		security_answer2:{
			'ui:widget': 'text'
		}
	},
	corporateLearnerProfile:{
		first_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'First Name*',
			'ui:options':{
				'label': false
			} 
		},
		middle_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Middle Name*',
			'ui:options':{
				'label': false
			} 

		},
		last_name:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Last Name*',
			'ui:options':{
				'label': false
			} 

		},
		birthdate:{
			'ui:widget' : 'date',
			'ui:placeholder': 'Birthdate*',
			'ui:options':{
				'label': false
			} 

		},
		address1:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 1*',
			'ui:options':{
				'label': false
			} 

		},
		address2:{
			'ui:widget' : 'textarea',
			'ui:placeholder': 'Address Line 2',
			'ui:options':{
				'label': false
			} 

		},
		country:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Country*',
			'ui:options':{
				'label': false
			} 

		},
		civil_status:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Civil Status*',
			'ui:options':{
				'label': false
			}
		},
		mobile_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Mobile Number',
			'ui:options': {
				'label': false
			}
		},
		phone_number:{
			'ui:widget' : 'text',
			'ui:placeholder': 'Phone Number',
			'ui:options': {
				'label': false
			}
		},
		nationality:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Nationality',
			'ui:options': {
				'label': false
			}
		},
		primary_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Primary Language',
			'ui:options': {
				'label': false
			}
		},
		other_known_language:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Other Known Language',
			'ui:options': {
				'label': false,
				addable: true

			}

		},
		interests_skills:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Interests Skills',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		interests_courses:{
			'ui:widget' : 'select',
			'ui:placeholder': 'Interests Courses',
			'ui:options': {
				'label': false,
				addable: true

			}
		},
		type_of_service:{
			'ui:widget' : 'checkboxes'
		},
		security_question1:{
			'ui:widget': 'select'
		},
		security_answer1:{
			'ui:widget' : 'text'
		},
		security_question2:{
			'ui:widget': 'select'
		},
		security_answer2:{
			'ui:widget': 'text'
		}
	}

}







function validate(formData, errors) {
  let input

  if (formData.userType === undefined || formData.userType === 'User Type') {
    errors.userType.addError('What type of user do you want to register.')
    input = 'userType'
  }



  FormHelper.setFocus(UISchema, input)

  return errors
}
