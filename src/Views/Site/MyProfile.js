import React, { Component } from 'react'
import MyProfileForm from '../../Redux/Containers/User/MyProfile'
import { PageTitle } from '../../Lib/Common/Views'

export default class MyProfile extends Component {
  render() {
    return (
      <div className="my-profile-view">
        <PageTitle title="My Profile" />
        <MyProfileForm location={this.props.location} />

      </div>
    )
  }
}
