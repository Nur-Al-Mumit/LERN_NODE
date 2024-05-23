import { createServer } from 'http';

const PORT = process.env.PORT

const students = [
    {id:1, name: "Nur Al Mumit"},
    {id:2, name: "Mahfuza akhter"},
    {id:3, name: "Anika yesmin"},
    {id:4, name: "Farzana Yeamin"},
    {id:5, name: "Ali MD. Sohel"},
];

const server = createServer((req, res)=>{
    if (req.url === '/api/students' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(students));
        res.end();
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'Route Not Found'}));
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`SubhanALLAH prints on port: ${PORT}`);
})