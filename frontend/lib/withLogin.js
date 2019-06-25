// @flow
import React from 'react'
import { connect } from 'react-redux'
import { getViewer } from './auth'
import { redirectToSignInPath } from './auth'
import { withLoginDidMount } from '../actions/withLogin'

type PropsType = {
  dispatch: Function,
  viewer: Object
};

export default App => {
  class WithLogin extends React.Component<PropsType> {
    static async getInitialProps(ctx) {
      const viewer = await getViewer(ctx.apolloClient);

      if (!viewer.loggedIn) {
        redirectToSignInPath(ctx);
      }

      return {
        viewer
      }
    }

    componentDidMount() {
      this.props.dispatch(withLoginDidMount(this.props.viewer));
    }

    render () {
      return (
        <App {...this.props} />
      )
    }
  }

  return connect()(WithLogin);
}
