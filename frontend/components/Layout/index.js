// @flow
import React, {Node} from 'react'
import Navbar from '../Navbar'
import './style.scss'

type PropsType = {
  children: Node
};

class Layout extends React.Component<PropsType> {
  render () {
    return (
      <main>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </main>
    )
  }
}

export default Layout;
