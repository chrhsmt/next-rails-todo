// @flow
import React from 'react'
import Layout from '../components/Layout'
import LogInForm from '../components/LogInForm'
import logInPage from '../lib/logInPage'

class LogIn extends React.Component {
  render () {
    return (
      <Layout>
        <h1>Log in</h1>
        <LogInForm />
      </Layout>
    )
  }
}

export default logInPage(LogIn);
