const db = require('../../../db/db');
const Cafe = require('../../../models/cafe');
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

class DeleteCafeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { cafeId } = command
        if (cafeId && !(await Cafe.isValidCafeId(cafeId))) {
            throw new Error("Invalid cafe id")
        }

        const sqlEmployees = `
            DELETE FROM employees 
            USING employee_cafe 
            WHERE employees.id  = employee_cafe.employee_id
            AND employee_cafe.cafe_id = $1
        `
        const deleteEmployees = db.none(sqlEmployees, [cafeId])

        const sqlCafes = `
            DELETE FROM cafes 
            WHERE id = $1
        `
        const deleteCafes = db.none(sqlCafes, [cafeId])

        // employee_cafe table cascade delete so dont need to query
        await Promise.all([deleteEmployees, deleteCafes])
    }
}

module.exports = new DeleteCafeHandler()