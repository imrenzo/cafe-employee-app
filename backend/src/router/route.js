const express = require('express')
const router = express.Router()
const db = require('../db/db')

// middleware for dev
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

// handle routing
const mediator = require('../application/mediator')

// Query functions
const GetCafesByLocationQuery = require('../application/queries/getCafesByLocationQuery')
const GetEmployeesByCafeQuery = require('../application/queries/getEmployeesByCafeQuery')
// Query mediators
mediator.register('GetCafesByLocationQuery', require('../application/queries/handlers/getCafesByLocationHandler'))
mediator.register('GetEmployeesByCafeQuery', require('../application/queries/handlers/getEmployeesByCafeHandler'))

// Command functions
const CreateNewCafeCommand = require('../application/commands/createNewCafeCommand')
const CreateNewEmployeeCommand = require('../application/commands/createNewEmployeeCommand')
const UpdateCafeCommand = require('../application/commands/updateCafeCommand')
const UpdateEmployeeCommand = require('../application/commands/updateEmployeeCommand')
const DeleteCafeCommand = require('../application/commands/deleteCafeCommand')
const DeleteEmployeeCommand = require('../application/commands/deleteEmployeeCommand')
// POST command
mediator.register('CreateNewCafeCommand', require('../application/commands/handlers/createNewCafeHandler'))
mediator.register('CreateNewEmployeeCommand', require('../application/commands/handlers/createNewEmployeeHandler'))
// PUT
mediator.register('UpdateCafeCommand', require('../application/commands/handlers/updateCafeHandler'))
mediator.register('UpdateEmployeeCommand', require('../application/commands/handlers/updateEmployeeHandler'))
// DELETE
mediator.register('DeleteCafeCommand', require('../application/commands/handlers/deleteCafeHandler'))
mediator.register('DeleteEmployeeCommand', require('../application/commands/handlers/deleteEmployeeHandler'))


// queries
router.get('/cafes', async (req, res) => {
    try {
        const { location } = req.query
        const query = new GetCafesByLocationQuery({ location })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error fetching cafes:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.get('/employees', async (req, res) => {
    try {
        const { cafe } = req.query
        const query = new GetEmployeesByCafeQuery({ cafe })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

// commands
router.post('/cafes', async (req, res) => {
    try {
        const { name, description, logo, location } = req.body
        const query = new CreateNewCafeCommand({ name, description, logo, location })
        response = await mediator.send(query)
        console.log(response)
        res.status(201).json(response);
    } catch (err) {
        console.error('Error creating cafe:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.post('/employees', async (req, res) => {
    try {
        const { name, emailAddress, phoneNumber, gender, cafeId } = req.body
        const query = new CreateNewEmployeeCommand({ name, emailAddress, phoneNumber, gender, cafeId })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error creating employees:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.put('/cafes', async (req, res) => {
    try {
        // cafeId used to amend data in db
        const { cafeId, name, description, logo, location } = req.body
        const query = new UpdateCafeCommand({ cafeId, name, description, logo, location })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error updating cafe:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.put('/employees', async (req, res) => {
    try {
        const { employeeId, name, emailAddress, phoneNumber, gender, newCafeId, start_date } = req.body
        const query = new UpdateEmployeeCommand(
            { employeeId, name, emailAddress, phoneNumber, gender, newCafeId, start_date }
        )
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.delete('/cafes', async (req, res) => {
    try {
        const { cafeId } = req.body
        const query = new DeleteCafeCommand({ cafeId })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error deleting cafe:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

router.delete('/employees', async (req, res) => {
    try {
        const { employeeId } = req.body
        const query = new DeleteEmployeeCommand({ employeeId })
        response = await mediator.send(query)
        console.log(response)
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
})

module.exports = router