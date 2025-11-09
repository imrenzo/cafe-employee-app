const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const mediator = require('../application/mediatorManager')

// middleware
const timeLog = router.use((req, res, next) => { console.log('Time: ', Date.now()), next() })

// Query functions
const GetCafesByLocationQuery = require('../application/queries/getCafesByLocationQuery')
const GetEmployeesByCafeQuery = require('../application/queries/getEmployeesByCafeQuery')
// Command functions
const CreateNewCafeCommand = require('../application/commands/createNewCafeCommand')
const CreateNewEmployeeCommand = require('../application/commands/createNewEmployeeCommand')
const UpdateCafeCommand = require('../application/commands/updateCafeCommand')
const UpdateEmployeeCommand = require('../application/commands/updateEmployeeCommand')
const DeleteCafeCommand = require('../application/commands/deleteCafeCommand')
const DeleteEmployeeCommand = require('../application/commands/deleteEmployeeCommand')

// --- Image upload ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- Helper for async handlers ---
const handle = (fn, status = 200) => async (req, res) => {
    try {
        const data = await fn(req);
        res.status(status).json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

// --- Queries ---
// For each GET method, create a path with handle ftn
// Get data fields from req.query
router.get('/cafes', handle(req => mediator.send(new GetCafesByLocationQuery(req.query))))
router.get('/employees', handle(req => mediator.send(new GetEmployeesByCafeQuery(req.query))));

// --- Commands ---
router.post('/cafes', async (req, res) => {
    try {
        const { name, description, logo, location } = req.body
        const query = new CreateNewCafeCommand({ name, description, logo, location })
        response = await mediator.send(query)
        res.status(201).json(response);
    } catch (err) {
        console.error('Error creating cafe:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

// POST /upload endpoint for images
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

// --- Commands ---
const routes = [
    ['post', '/cafes', CreateNewCafeCommand, 201],
    ['post', '/employees', CreateNewEmployeeCommand, 201],
    ['put', '/cafes', UpdateCafeCommand, 202],
    ['put', '/employees', UpdateEmployeeCommand, 202],
    ['delete', '/cafes', DeleteCafeCommand, 202],
    ['delete', '/employees', DeleteEmployeeCommand, 202]
];

// For each http request method, create a path with handle ftn
// Get data fields from req.body
routes.forEach(([method, path, Command, status]) =>
    router[method](path, handle(req => mediator.send(new Command(req.body)), status))
);

module.exports = router