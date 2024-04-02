import * as http from 'http';
import * as fs from "fs";
import * as path from 'path';
import EnvSetup from './setup/env-setup.js';
import Logging from "./setup/winston-setup.js";
import {Socket} from "net";

EnvSetup();

const hostname = process.env.NODE_ENV_HOSTNAME;
const port = Number(process.env.NODE_ENV_PORT);
const server = http.createServer((req, res) => {
    // URL 경로에 따라 정적 파일을 응답
    // URL 경로에 따라 정적 파일을 응답
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './src/index.html'; // 기본 파일 설정
    }
    // 파일을 읽어서 응답으로 전송합니다.
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    Logging.info('Hello TCP! \t' + hostname  + ':' + port)
});

const io = new Socket(server)
io.on('connection', (socket) => {
    console.log('새로운 사용자가 연결되었습니다.');

    // 클라이언트에서 보낸 이벤트 수신 및 처리
    socket.on('chat message', (msg) => {
        console.log('수신한 메시지:', msg);
        // 클라이언트들에게 메시지 전송
        io.emit('chat message', msg);
    });
})