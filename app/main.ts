import * as net from 'net';

// Uncomment this to pass the first stage
const server = net.createServer(socket => {
  socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));

  // socket.on('close', () => {
  socket.end();
  // });
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

