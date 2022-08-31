import http from 'http'
import { todosHandles } from './requestHandles/todosHandles.js'

const hostname = '127.0.0.1'
const port = 5000

const server = http.createServer( async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    if (req.url.startsWith('/api/v1/todos')){ 
        let a = req.url.slice(13)
        req.url = a
        todosHandles(req, res)
    }else{
        res.end('Invalid Request!');
    }
});

server.listen(port,hostname,() => {
    console.log(`server running at http://${hostname}:${port}/`);
});
