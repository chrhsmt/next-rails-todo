// @flow
import React from 'react'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'
import logInPage from '../lib/logInPage'

class SignUp extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Sign up</h1>
        <SignUpForm />
      </Layout>
    )
  }
}

export default logInPage(SignUp);
