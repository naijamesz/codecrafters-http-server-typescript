import * as net from 'net';

// Uncomment this to pass the first stage
const server = net.createServer(socket => {
  // socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));

  socket.on('data', data => {
    const request = data.toString();
    const path = request.split(' ')[1];
    const response = path === '/' ? 'HTTP/1.1 200 OK\r\n\r\n' : 'HTTP/1.1 404 Not Found\r\n\r\n';
    socket.write(response);
    socket.end();
  });
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log('Logs from your program will appear here!');

server.listen(4221, 'localhost', () => {
  console.log(`Server is running on port : 4221`);
});

/*
>Note:การตอบสนอง HTTP ประกอบด้วยสามส่วน โดยแต่ละส่วนคั่นด้วยCRLF ( \r\n):
เส้นสถานะ
ส่วนหัวตั้งแต่ศูนย์รายการขึ้นไป โดยแต่ละรายการลงท้ายด้วย CRLF
เนื้อหาตอบกลับที่เป็นตัวเลือก

*Status line
HTTP/1.1  // HTTP version
200       // Status code
OK        // Optional reason phrase
\r\n      // CRLF that marks the end of the status line

*Headers (empty)
\r\n      // CRLF that marks the end of the headers

Response body (empty)

*/

// Extract URL path
// Request line
// GET                          // HTTP method
// /index.html                  // Request target
// HTTP/1.1                     // HTTP version
// \r\n                         // CRLF that marks the end of the request line

// Headers
// Host: localhost:4221\r\n     // Header that specifies the server's host and port
// User-Agent: curl/7.64.1\r\n  // Header that describes the client's user agent
// Accept: */*\r\n              // Header that specifies which media types the client can accept
// \r\n                         // CRLF that marks the end of the headers
// Request body (empty)

