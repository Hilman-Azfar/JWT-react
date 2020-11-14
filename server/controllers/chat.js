const { ObjectId } = require('mongodb');
const chatterboxDB = require('../server');

module.exports = {
  addContact,
  getContacts,
  createRoom,
  getRooms,
  sendMessage,
  getMessages,
}

async function addContact(req, res, next) {
  try {
    const { contact, username } = req.body
    const user = await chatterboxDB.collection('users')
                                   .findOne(
                                     { username: contact} ,
                                     { projection: {username: 1} }
                                   );

    if (!user) {
      throw new Error('user not found')
    }
    const added = await chatterboxDB.collection('users')
                                    .findOneAndUpdate(
                                      { username: username },
                                      { $push: { contacts: user} },
                                      {
                                        returnOriginal: false,
                                        projection: {_id: 0, contacts: 1}
                                      }
                                    );
    if (added) {
      res.json(added.value);
    } else {
      throw new Error('could not create contact')
    }
    
  } catch (err) {
    err.name = 'addContact';
    err.status = 500;
    next(err)
  }
}

async function getContacts(req, res, next) {
  try {
    const username = req.username
    const contacts = await chatterboxDB.collection('users')
                                       .findOne(
                                         { username: username} ,
                                         { projection: {_id: 0, contacts: 1} }
                                       );
    if (contacts) {
      res.json(contacts)
    }
  } catch(err) {
    err.name = 'getContacts';
    err.status = 500;
    next(err)
  }
}

async function createRoom(req, res, next) {
  try {
    const { participants } = req.body;
    const result = await chatterboxDB.collection('rooms')
                                      .insertOne(
                                        { participants }
                                      );
    await chatterboxDB.collection('users')
                      .updateMany(
                        { _id : {$in: participants.map(el => ObjectId(el._id))} },
                        { $push: {rooms: {roomid: result.insertedId, participants}} }
                      )
    res.json({
        roomid: result.insertedId,
        participants
    })
  } catch (err) {
    err.name = 'createRoom';
    err.status = 500;
    next(err)
  }
}

async function getRooms(req, res, next) {
  try {
    const username = req.username;
    const rooms = await chatterboxDB.collection('users')
                                    .findOne(
                                      { username },
                                      { projection: {_id: 0, rooms: 1}}
                                    );
    res.json(rooms);
  } catch (err) {
    err.name = 'getRooms';
    err.status = 500;
    next(err)    
  }
}

async function sendMessage(req, res, next) {
  try {
    const { content, roomid, from } = req.body;
    await chatterboxDB.collection('messages')
                      .insertOne({
                        roomid,
                        from,
                        content
                      })
    res.json({
      message: 'ok'
    })
  } catch (err) {
    err.name = 'sendMessage';
    err.status = 500;
    next(err) 
  }
}

async function getMessages(req, res, next) {
  try {
    const { roomid } = req.params;
    const messages = await chatterboxDB.collection('messages')
                                       .find(
                                         {roomid},
                                         { projection : {_id: 0, roomid: 1, from: 1, content: 1}}
                                        )
                                       .toArray();
    res.json({
      messages
    })                                  
  } catch(err) {
    err.name = 'getMessages';
    err.status = 500;
    next(err) 
  }
}