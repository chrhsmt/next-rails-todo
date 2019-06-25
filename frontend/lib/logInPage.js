// @flow
import React from 'react'
import { connect } from 'react-redux'
import { getViewer } from './auth'
import { redirectToAfterSignInPath } from './auth'
import { logInPageDidMount } from '../actions/logInPage'

type PropsType = {
  dispatch: Function,
  viewer: Object
};

export default App => {
  class LogInPage extends React.Component<PropsType> {
    static async getInitialProps(ctx) {
      const viewer = await getViewer(ctx.apolloClient);
      if (viewer.loggedIn) {
        redirectToAfterSignInPath(ctx);
      }
      return {
        viewer
      }
    }

    componentDidMount() {
      this.props.dispatch(logInPageDidMount(this.props.viewer));
    }

    render () {
      return (
        <App {...this.props} />
      )
    }
  }

  return connect()(LogInPage);
}
