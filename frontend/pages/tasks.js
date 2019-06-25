// @flow
import React from 'react'
import Layout from '../components/Layout'
import TaskList from '../components/TaskList'
import withLogin from '../lib/withLogin'

class Tasks extends React.Component {
  render () {
    return (
      <Layout>
        <div className="container">
          <TaskList />
        </div>
      </Layout>
    )
  }
}

export default withLogin(Tasks);
