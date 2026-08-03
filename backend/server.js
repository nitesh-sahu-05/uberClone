const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./Socket');
const port = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});