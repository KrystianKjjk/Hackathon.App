import * as http from 'http'
import app from './app'
import { Server, Socket } from 'socket.io'

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {});

io.on("connection", (socket: Socket) => {
    
});
server.listen(port, () => console.log(`Listening on port ${port}...`));