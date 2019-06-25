// @flow
import React from 'react'
import Link from 'next/link'

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link href="/">
      <a className="navbar-brand">TODO App</a>
    </Link>
  </nav>
)

export default Navbar;
