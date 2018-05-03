import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { NavLink, AuthNavLink } from '../../../Lib/Common/Views'
import SignOutButton from '../../../Redux/Containers/Sessions/SignOutButton'
import PisaraLogo from '../../../Assets/Images/pisara-logo-with-text.png'


class Header extends Component {
  render() {
    const path = this.props.match.path
    const referrer = window.location.pathname

    return (
      <header className="header">
        <Navbar inverse>
          <Navbar.Header>
            <Link to="/" className="navbar-brand"> <img src={PisaraLogo}  alt="Pisara Logo" /></Link>
            <Navbar.Toggle id="js-navbar-toggle-btn" />
          </Navbar.Header>
          <Navbar.Collapse>
            <ul className="navbar-nav nav navbar-right">
              <NavLink title="Redux" to="/redux" path={path} />
              <NavLink title="Sign In" to="/sign-in" path={path} isSignedOut />
              <NavLink title="Sign Up" to="/sign-up" path={path} isSignedOut />
              <AuthNavLink title="Admin" to="/admin/dashboard" />
              <AuthNavLink title="My Profile" to="/my-profile" path={path} />
              <SignOutButton referrer={referrer} />
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default withRouter(Header)
