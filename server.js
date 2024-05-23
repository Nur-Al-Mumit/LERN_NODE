import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';


// For get current path
// __filename
// __dirname

// const __dirname = url.fileURLToPath(import.meta.url)
// // console.log(__dirname);
// const __filename = path.dirname(__dirname)

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);

const server = http.createServer(async (req, res) => {
    try {
        // console.log(req.url);
        // console.log(req.method);
        if (req.method === 'GET') {
            let filePath;
            if (req.url === '/') {
                // res.writeHead(200, { 'Content-Type': 'text/html' })
                // res.end("<h1>Alhamdulillah this our home page</h1>")
                filePath = path.join(__dirname, 'public', 'index.html')
            } else if (req.url === '/about') {
                // res.writeHead(200, { 'Content-Type': 'text/html' })
                // res.end("<h1>Alhamdulillah this our about page</h1>")
                filePath = path.join(__dirname, 'public', 'about.html')
            } else {
                // res.writeHead(400, { 'Content-Type': 'text/html' })
                // res.end("<h1>Not Found Page</h1>")
                // filePath = path.join(__dirname, 'public', 'index.html')
                throw new Error("Page not found")
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html')
            res.write(data);
            res.end();
        } else {
            throw new Error('Method not Allowed');
        }

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end('Spacific Method Not Found')
    }


    // res.write("<h1>Alhamdulillah</h1>");
    // res.end();
})
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`SubhanALLAH prints on port: ${port}`);
})