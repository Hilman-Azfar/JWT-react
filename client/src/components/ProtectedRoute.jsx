import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth'

export default function ProtectedRoute({component: Component, ...rest}) {
  const auth = useAuth();
  return (
    <Route
    {...rest}
    render={({ location }, props) =>{
        return auth.user?.username
        ? (<Component {...props}/>)
        : (<Redirect to={{
              pathname: '/landing',
              state: { from: location}
            }}
          />)
        }
      }
    />
  )
}
