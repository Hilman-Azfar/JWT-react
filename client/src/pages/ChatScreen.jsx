import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import io from 'socket.io-client';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Tabs from '../components/Tabs';

const ChatGrid = styled.div`
  display: grid;
  border: 1px solid black;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  padding: 5px;
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  
  grid-template-areas: 
  "nav"
  "list"
  "input";

  @media ${({theme}) => theme.media.pc} {
    grid-template-columns: 300px auto;
    grid-template-rows: min-content auto min-content;

    grid-template-areas: 
    "menu nav"
    "menu list"
    "menu input";
  }

  > div {
    border: 1px solid black;
  }
`;

const ChatNav = styled.div`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
`;

const ChatMenu = styled.div`
  grid-area: menu;
  position: absolute;
  background: ${({theme}) => theme.colors.purple};
  height: 100%;
  width: 100%;
  left: -100%;
  top: 0;
  transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  transform: ${({menu}) => menu ? "translateX(100%)" : "translateX(0)"};
  
  @media ${({theme}) => theme.media.pc} {
    background: transparent;
    grid-area: menu;
    position: static;
    transform: translateX(0);
  }
`;

const ChatList = styled.div`
  grid-area: list;
`;

const ChatInput = styled.div`
  grid-area: input;

`;

export default function ChatScreen() {
  let auth = useAuth();
  let { username } = auth.user
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const params = {
      reconnectionAttempts: '3',
      reconnectionDelay: '30000',
      query: `username=${username}` 
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

  const [chatList, setChatList] = useState([
    {
      roomid: 'qwerty',
      participants: ['hilman', 'azfar'],
      unread: true
    },{
      roomid: 'zxcv',
      participants: ['hilman', 'john'],
      unread: true
    },{
      roomid: 'asdf',
      participants: ['hilman', 'phillip'],
      unread: true
    }
  ]);
  // fetch chatlist once
  /* 
  {
    roomid: 'qwerty',
    participants: [],
    unread: true
  } 
  */
  
  const [contacts, setContacts] = useState([
    {
      id: '231412341234',
      username: 'azfar',
      online: true
    },{
      id: '123459807',
      username: 'john',
      online: true
    },{
      id: '910239058123',
      username: 'phillip',
      online: true
    }
  ]);
  // fetch contacts once
  /*
  {
    id: '231412341234',
    username: 'hilman',
    online: true
  }
  */

  const [currentChat, setCurrentChat] = useState(null);
  const getChatMessages = (chat) => {
    toggleMenu(false);
    // fetch chat history
    // show messages to load this chat
    setCurrentChat(chat)
  }

  const [showMenu, toggleMenu] = useState(false);

  const [prompt, setPrompt] = useState('chat')

  return (
    <ChatGrid menu={showMenu}>
      <ChatNav>
        <button onClick={() => toggleMenu(!showMenu)}>
          Menu
        </button>
        <Header />
      </ChatNav>
      <ChatMenu menu={showMenu}>
        <div>
          <button onClick={() => toggleMenu(!showMenu)}>
            Close
          </button>
          <p>lets {prompt}</p>
          <Tabs getActive={setPrompt}>
            <div label="Contacts">
              {
                contacts.length !== 0 
                ? contacts.map((contact) => (
                  <div key={contact.id}>
                    {contact.username}
                  </div>
                ))
                : (
                  <p>Add new contacts</p>
                )
              }
            </div>
            <div label="Chats">
              {
                chatList.length !== 0 
                ? chatList.map(chat => {
                  let to = chat.participants.filter(name=>{
                    return name !== username;
                  })
                  return (
                    <div key={chat.roomid} onClick={() => getChatMessages(chat)}>
                      {to}
                    </div>
                  )
                })
                : (
                  <p>Create new conversations</p>
                )
              }
            </div>
          </Tabs>
        </div>
      </ChatMenu>
      <ChatList>
        {
          currentChat 
          ? (
          <p> Loading {currentChat.roomid} room chatting with {currentChat.participants[1]}</p>
          )
          : (
            <p>Maybe we can have the bot room at default?</p>
          )
        }
      </ChatList>
      <ChatInput>
        <input>
        </input>
        <button>
          emoticon
        </button>
        <button>
          send
        </button>
      </ChatInput>
    </ChatGrid>
  )
}
