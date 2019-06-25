// @flow
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from '../lib/withRedux'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store, apollo } = this.props

    return (
      <Container>
        <Provider store={store}>
          <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </Container>
    )
  }
}

export default withApollo(withRedux(MyApp))
