import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/home'>Home</Link>
      <Link to='/landing'>Landing</Link>
      logout
    </header>
  )
}
