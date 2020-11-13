import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://127.0.0.1:4000';
const socket = socketIOClient(ENDPOINT);
console.log('Connected socket!');

export default socket;
