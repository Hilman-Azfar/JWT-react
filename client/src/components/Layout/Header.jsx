import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'

export default function Header() {
  let auth = useAuth();
  return (
    <header>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/home'>Home</Link>
      <Link to='/landing'>Landing</Link>
      {
        auth.user && <p>logged in as {auth.user.username}</p>
      }
    </header>
  )
}
