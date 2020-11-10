import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from '../../context/auth'

const StyledHeader = styled.header`
  > div {
    margin: 5px;
    display: flex;
    justify-content: space-evenly;
  }

  > div p {
    margin: 0;
  }
`;

export default function Header() {
  let auth = useAuth();
  let history = useHistory();

  return (
    <StyledHeader>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/home'>Home</Link>
      <Link to='/landing'>Landing</Link>
      {
        auth.user?.username && <div>
        <p>logged in as {auth.user.username}</p>
        <button onClick={ async () => {
          try {
            await auth.logout();
            await history.push('/login');
          } catch (err) {
            console.error('cant logout oh no!');
          }
        }}>
          log out
        </button>
        </div>
      }
    </StyledHeader>
  )
}
