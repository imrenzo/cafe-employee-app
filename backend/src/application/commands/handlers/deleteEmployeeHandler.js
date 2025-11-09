const db = require('../../../db/db');
const Employee = require('../../../models/employee');
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

// Handles deletion of employee with database interactions
class DeleteEmployeeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { employeeId } = command
        if (employeeId && !(await Employee.isValidEmployeeId(employeeId))) {
            throw new Error("Invalid cafe id")
        }

        const sqlEmployees = `DELETE FROM employees WHERE id = $1`
        const deleteEmployees = db.none(sqlEmployees, [employeeId])
        await deleteEmployees
    }
}

module.exports = new DeleteEmployeeHandler()