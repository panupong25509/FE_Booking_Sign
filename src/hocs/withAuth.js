
import React, { Component } from 'react'
import cookie from 'react-cookies';
import { Link, Redirect } from 'react-router-dom'

const withAuth = (WrappedComponent) => {
  return class ComponentWithAuth extends Component {
    render() {
      if (cookie.load('user')===undefined) return <Redirect to='/login' />
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withAuth