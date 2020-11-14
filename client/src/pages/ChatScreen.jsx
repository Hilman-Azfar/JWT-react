import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import io from 'socket.io-client';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Tabs from '../components/Tabs';
import SimpleText from '../components/SimpleText';
// import RichText from '../components/RichText';

export default function ChatScreen() {
  let auth = useAuth();
  let { _id, username } = auth.user;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const params = {
      reconnectionAttempts: '3',
      reconnectionDelay: '30000',
      query: `id=${_id}` 
    };
    const sock = io(params);
    setSocket(sock);

    sock.on('connect', () => {
      console.log('connected');
      if (currentChat) {
        getChatMessages(currentChat.roomid);
        sock.emit('join', {roomid: currentChat.roomid});
      }
    })



    sock.on('disconnect', () => {
      console.log('connection lost');
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
    // {
    //   roomid: 'qwerty',
    //   participants: ['hilman', 'azfar'],
    //   unread: true
    // },{
    //   roomid: 'zxcv',
    //   participants: ['hilman', 'john'],
    //   unread: true
    // },{
    //   roomid: 'asdf',
    //   participants: ['hilman', 'phillip'],
    //   unread: true
    // }
  ]);

  // fetching all rooms
  useEffect(() => {
    (async () => {
      const url = '/chat/rooms';
      const result = await fetch(url);
      const rooms = await result.json();
      if (rooms?.rooms){
        setChatList(rooms.rooms);
      }
    })()
  }, [socket])
  
  const [contacts, setContacts] = useState([
    // {
    //   id: '231412341234',
    //   username: 'azfar',
    //   online: true
    // },{
    //   id: '123459807',
    //   username: 'john',
    //   online: true
    // },{
    //   id: '910239058123',
    //   username: 'phillip',
    //   online: true
    // }
  ]);

  // fetching contacts
  useEffect(() => {
    (async () => {
      const url = '/chat/contact';
      const res = await fetch(url);
      const data = await res.json();
      if (data?.contacts) {
        setContacts(data.contacts);
      }
    })()
  }, [])

  // take a room instance
  const [currentChat, setCurrentChat] = useState(null);
  const getChatMessages = async (id) => {
    // fetch chat history
    // show messages to load this chat
    try {
      const url = '/chat/message/' + id;
      const res = await fetch(url);
      const data = await res.json();
      setMessages(data.messages)
    } catch (err) {

    }
  }

  const [showMenu, toggleMenu] = useState(false);

  const [prompt, setPrompt] = useState(null);

  const [newContact, setNewContact] = useState('');
  const handleCreateContact = async () => {
    try {
      if (newContact === '' || newContact === username) return
      let found = contacts.find(contact => contact.username === newContact);
      if (found) {
        console.log('contact exists');
        setNewContact('');
        return
      };
      // send server contact 
      // server will add into user contacts
      // fetch user info
      const url = '/chat/contact';
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          contact: newContact
        })
      }
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setContacts([...contacts, {
          id: newContact,
          username: newContact,
          online: true
        }]);
        setNewContact('');
      } else {
        console.log(data.errorMessage);
      }
    } catch (err) {
      // error msg and close
    }
  }

  const openChat = async (contact) => {
    // socket to join room
    // open chat on the other side
    // get room details from db
    try {
      // check current chats
      // check chatlist
      // if found
      // close menu
      // change currentChat
      // if not found
      // create new room
      // add to chatlist
      // change currentChat

      if (currentChat?.participants.find(p => p.username === contact.username)) {
        console.log('current');
        return toggleMenu(false);
      } else {
        let found = chatList.find(chat => chat.participants.find(p => p.username === contact.username))
        if (found) {
          console.log('found');
          clearChatAndGetMessages(found.roomid);
          socket.emit('join', {roomid: found.roomid, prev: currentChat?.roomid});
          setCurrentChat(found);
        } else {
          console.log('creating');

          // create new room in db for both sides
          const url = '/chat/create';
          const options = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              participants: [{_id, username}, {...contact}],
            })
          }

          const res =  await fetch(url, options);
          const room = await res.json();
          // join the room in client
          setPrompt(contact.username);
          // save message to the db
          // send message to the other side

          clearChatAndGetMessages(room.roomid);
          socket.emit('join', {roomid: room.roomid, prev: currentChat?.roomid});
          setCurrentChat(room);
          setChatList([...chatList, room]);
        }
      }
      toggleMenu(false);
    } catch (err) {

    }
  }

  const openExisting = async (chat) => {
    clearChatAndGetMessages(chat.roomid);
    socket.emit('join', {roomid: chat.roomid, prev: currentChat?.roomid});
    setCurrentChat(chat);
    setPrompt(chat.participants.filter(user=>{
      return user.username !== username;
    })[0].username)
    toggleMenu(false);
    // fetch messages to show on screen
  }

  const clearChatAndGetMessages = async (id) => {
    console.log('clearing msgs');
    setMessages([]);
    // fetch messages
    getChatMessages(id)
  }

  const [messages, setMessages] = useState([]);

  /*
   {
     id: '123123123123',
     roomid: 'qwerty',
     to: 'azfar',
     from: 'hilman',
     content: 'fancy text bro',
   }
   */
  useEffect(() => {
    if (socket) {
      socket.on('message', msg => {
        console.log('msg received');
        setMessages(state => [...state, msg]);
      })
    }
  }, [socket])

  const sendMessage = async (text) => {
    // send to server
    // construct message object
    try {
      if (!currentChat) return;

      console.log('msg saved');
      const url = '/chat/message'
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          roomid: currentChat.roomid,
          from: username,
          content: text
        })
      }

      const res = await fetch(url, options);
      if (res.ok) {
        console.log('msg sent');
        socket.emit('sendMessage', {roomid: currentChat.roomid, from: username, content: text})  
      }
    } catch (err) {

    }
  }

  return (
    <ChatGrid menu={showMenu}>
      <ChatNav>
        <button onClick={() => toggleMenu(!showMenu)}>
          Menu
        </button>
        {prompt ? <h3>Chatting with {prompt}</h3> : null}
        <Header />
      </ChatNav>
      <ChatMenu menu={showMenu}>
        <div>
          <button onClick={() => toggleMenu(!showMenu)}>
            Close
          </button>
          <Tabs>
            <div label="Contacts">
              <input value={newContact} onChange={e=>setNewContact(e.target.value)}/>
              <button onClick={handleCreateContact}>
                Add new contacts
              </button>
              {
                contacts.length !== 0 
                ? contacts.map((contact) => (
                  <div key={contact._id} onClick={() => openChat(contact)}>
                    {contact.username}
                  </div>
                ))
                : (
                  null
                )
              }
            </div>
            <div label="Chats">
              {
                chatList.length !== 0 
                ? chatList.map(chat => {
                  let to = chat.participants.filter(user=>{
                    return user.username !== username;
                  })
                  return (
                    <div key={chat.roomid} onClick={() => openExisting(chat)}>
                      {to[0].username}
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
          <p> Loading {currentChat.roomid} room</p>
          )
          : (
            <p>Maybe we can have the bot room at default?</p>
          )
        }
        <MessageList>
          {
            messages.length !== 0 &&
            messages.map((msg, k) => {
              return (
                <Message me={msg.from === username} key={k}>
                  {msg.from} : {msg.content}
                </Message>
              )
            })
          }
        </MessageList>
      </ChatList>
      <ChatInput>
        <SimpleText sendMessage={sendMessage}/>
        {/* <RichText/> */}
      </ChatInput>
    </ChatGrid>
  )
}

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
  z-index: 100;
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

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background: ${({me}) => me ? 'green' : 'orange'};
`;

const ChatInput = styled.div`
  grid-area: input;
  padding: 3px;
  background: #e5e5e5;
`;
