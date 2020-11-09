import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth'

export default function ChatScreen() {
  let auth = useAuth();
  let history = useHistory();
  return (
    <div>
      <button onClick={async () => {
        try {
          await auth.logout();
          await history.push('/login');
        } catch (err) {
          console.error(err);
        }
        }}>
        Log out
      </button>
    </div>
  )
}
