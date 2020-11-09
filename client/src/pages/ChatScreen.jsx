import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth'
import io from 'socket.io-client';

export default function ChatScreen() {
  let auth = useAuth();
  let history = useHistory();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const params = {
      reconnectionAttempts: '3',
      reconnectionDelay: '30000',
      query: `username=${auth.user.username}` 
    };
    const sock = io(params);
    setSocket(sock);

    sock.on('connect', () => {
      console.log('connected');
    })

    sock.on('disconnect', () => {
      console.log('connection lost');
    })

    sock.on('message', data => {
      console.log(data);
    })

    sock.on('error', error => {
      console.log('.....................');
      console.error(error);
    })

    return () => {
      setSocket(null);
      sock.close();
    }
  }, [])

  return (
    <div>
      <button onClick={
        () => {
          socket.emit('message', 'hi all');
        }
      }>
        Send shit
      </button>
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
