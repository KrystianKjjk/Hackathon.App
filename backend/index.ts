import * as http from 'http'
import app from './app'

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);


class ChatUser {
    uid: any;
    sid: any;
    gid: any;
    constructor(uid, sid) {
      this.uid = uid;
      this.sid = sid;
      this.gid
    }
  }
  let userList = [];
  
  //Socket io connection
io.on('connection', socket => {
    //new user
    socket.on('new user', uid => {
        userList.push(new ChatUser(uid,socket.id))
    });

    // Join group
    socket.on('join group', (uid, gid) => {
        for (let i = 0; i < userList.length; i++) {
        if (socket.id === userList[i].sid) userList[i].gid = gid;
        }
    });

    // New group
    socket.on('create group', (uid, title) => {
        io.emit('fetch group');
    });

    // New message
    socket.on('message', (uid, gid) => {
        for (const user of userList) {
        if (gid === user.gid) io.to(user.sid).emit('fetch messages', gid);
        }
    });

    // Close connection
    socket.on('disconnect', () => {
        for (let i = 0; i < userList.length; i++) {
        if (socket.id === userList[i].sid) userList.splice(i, 1);
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}...`));