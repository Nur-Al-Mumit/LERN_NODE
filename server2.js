import { createServer } from 'http';

const PORT = process.env.PORT

const students = [
    { id: 1, name: "Nur Al Mumit" },
    { id: 2, name: "Mahfuza akhter" },
    { id: 3, name: "Anika yesmin" },
    { id: 4, name: "Farzana Yeamin" },
    { id: 5, name: "Ali MD. Sohel" },
];

// Middleware

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

//JSON Middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next()
}


// Route handler for GET /API/STUDENTS
const getStudents = (req, res) => {
    res.write(JSON.stringify(students));
    res.end();
}


// Route handler for GET /API/STUDENT/:ID
const getStudent = (req, res) => {
    let id = req.url.split('/')[3];
    let student = students.find((student) => student.id === parseInt(id));

    if (student) {
        res.write(JSON.stringify(student));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Student Not Found" }));
    }
    res.end();
}


// Route handler for POST /api/create-student
const createStudent = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    })
    req.on('end', () => {
        const newStudent = JSON.parse(body);
        students.push(newStudent);
        res.statusCode = 201;
        // res.write(JSON.stringify({ message: 'Alhamdulillah Created New Student' }))
        res.write(JSON.stringify(newStudent));
        res.end();
    })

    // res.statusCode = 404;
    // res.write(JSON.stringify({ message: 'Route Not Found test' }));
    // res.end();
}
// Route handler for POST /api/create-student

// Route handler
const notFound = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route Not Found' }));
    res.end();
}
// Route handler

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/students' && req.method === 'GET') {
                getStudents(req, res);
            } else if (
                req.url.match(/\/api\/student\/([0-9]+)/) &&
                req.method === 'GET') {

                getStudent(req, res);

            } else if (req.url === '/api/create-student' && req.method === 'POST') {
                createStudent(req, res);
                // getStudents(req, res);
            } else {
                notFound(req, res);
            }
        })
    })



})

server.listen(PORT, () => {
    console.log(`SubhanALLAH prints on port: ${PORT}`);
})