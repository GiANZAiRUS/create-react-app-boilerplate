import * as Types from '../Actions/User/Types'

const DEFAULT_STATE = { queryString: '' }

export default function(state=DEFAULT_STATE, action) {
  switch(action.type) {
    case Types.MY_PROFILE_SAVE_QUERY:
      return action.MyProfile
    default:
      return state
  }
}
