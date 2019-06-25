// @flow
import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

class Index extends React.Component {
  render () {
    return (
      <Layout>
        <div className="container">
          <div className="jumbotron my-5">
            <h1 className="display-4">TODO App</h1>
            <p className="lead">サンプル実験アプリ</p>

            <hr className="my-4" />

            <Link href="/sign_up">
              <a className="btn btn-secondary btn-lg">Sign up</a>
            </Link>
            <Link href="/log_in">
              <a className="btn btn-primary btn-lg mx-1">Log in</a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index;
