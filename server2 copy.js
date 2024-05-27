import { createServer } from 'http';

const PORT = process.env.PORT

const students = [
    { id: 1, name: "Nur Al Mumit" },
    { id: 2, name: "Mahfuza akhter" },
    { id: 3, name: "Anika yesmin" },
    { id: 4, name: "Farzana Yeamin" },
    { id: 5, name: "Ali MD. Sohel" },
];

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/students' && req.method === 'GET') {
        res.write(JSON.stringify(students));

    } else if (req.url.match(/\/api\/student\/([0-9]+)/) && req.method === 'GET') {
        let id = req.url.split('/')[3];
        let student = students.find((student) => student.id === parseInt(id));
        if (student) {
            res.write(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: "Student Not Found" }))
        }
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'Route Not Found' }));
    }
    res.end();
})

server.listen(PORT, () => {
    console.log(`SubhanALLAH prints on port: ${PORT}`);
})