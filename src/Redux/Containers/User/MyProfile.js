import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { auth } from '../../Actions/Sessions'
import * as Actions from '../../Actions/User'
import MyProfileForm from '../../../Components/Forms/MyProfile'

function mapStateToProps({ MyProfile }) {
  return { MyProfile }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ auth }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileForm)
