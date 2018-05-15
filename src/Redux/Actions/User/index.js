import { MY_PROFILE_SAVE_QUERY } from  './Types'

export function saveQuery(MyProfile) {
  return { type: MY_PROFILE_SAVE_QUERY, MyProfile }
}
