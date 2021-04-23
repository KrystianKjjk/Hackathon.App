import * as http from 'http'
import app from './app'
import socket from 'socket.io'

const port = process.env.PORT || 3000;
const server = http.createServer(app);
// const io = socket(server);

server.listen(port, () => console.log(`Listening on port ${port}...`));