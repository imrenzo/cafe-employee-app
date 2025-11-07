const dayjs = require('dayjs');
const db = require('../../../db/db');
const Employee = require('../../../models/employee');
const Cafe = require('../../../models/cafe');
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

class CreateNewEmployeeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { name, emailAddress, phoneNumber, gender, cafeId } = command;
        // validate inputs
        if (!Employee.isValidEmployeeFields({name: name, email: emailAddress, phone: phoneNumber, gender: gender})) {
            throw new Error("Invalid employee fields")
        }
        if (cafeId && !(await Cafe.isValidCafeId(cafeId))) {
            throw new Error("Invalid cafe id")
        }
        const sql = `
            WITH new_employee AS (
                INSERT INTO employees (name, email_address, phone_number, gender) 
                VALUES ($1, $2, $3, $4)
                RETURNING id
            )
            INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
            SELECT id, $5, $6
            FROM new_employee
            RETURNING employee_id;
        `
        const params = [name, emailAddress, phoneNumber, gender, cafeId, new dayjs().format('YYYY-MM-DD')]
        const new_id = await db.one(sql, params)
        return new_id
    }
}

module.exports = new CreateNewEmployeeHandler()