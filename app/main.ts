import * as fs from 'fs';
import * as net from 'net';
import * as process from 'process';

const server: net.Server = net.createServer((socket: net.socket) => {
  // socket.write('HTTP/1.1 200 OK\r\n\r\n');
  // socket.end();
  socket.on('data', (buffer: net.Buffer | string) => {
    let request: string[] = buffer.toString().split(' ');
    let path: string = request[1];
    if (path === '/') {
      socket.write('HTTP/1.1 200 OK\r\n\r\n');
    } else {
      let pathContents: string[] = path.split('/');
      pathContents.shift();
      if (pathContents[0] === 'echo') {
        socket.write(
          `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${pathContents[1].length}\r\n\r\n${pathContents[1]}`
        );
      } else if (pathContents[0] === 'user-agent') {
        let userAgent: string[] = request.at(-1).trim();
        socket.write(
          `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`
        );
      } else if (pathContents[0] === 'files') {
        let directory: string = process.argv[3];
        let fileName: string = pathContents[1];
        fs.readFile(directory + fileName, 'utf8', (err: Error, data: string) => {
          if (err) {
            socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
          }
          socket.write(
            `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${data.length}\r\n\r\n${data}`
          );
        });
      } else {
        socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      }
    }
  });
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log('Logs from your program will appear here!');

// Uncomment this to pass the first stage
server.listen(4221, 'localhost', () => {
  console.log('Server is running on port 4221');
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

