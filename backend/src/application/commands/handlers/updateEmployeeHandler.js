const AbstractHandlerInterface = require("../../abstractHandlerInterface");
const Cafe = require("../../../models/cafe");
const db = require("../../../db/db");
const Employee = require("../../../models/employee");

class UpdateEmployeeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { employeeId, name, emailAddress, phoneNumber, gender, newCafeId, start_date } = command;
        // validate inputs
        if (newCafeId && !(await Cafe.isValidCafeId(newCafeId))) {
            throw new Error("Invalid new cafe id")
        }
        if (employeeId && !(await Employee.isValidEmployeeId(employeeId))) {
            throw new Error("Invalid employee id")
        }
        if (!Employee.isValidEmployeeFields({name: name, email: emailAddress, phone: phoneNumber, gender: gender})) {
            throw new Error("Invalid employee fields")
        }
        const updateEmployee = this.#updateEmployee({ employeeId, name, emailAddress, phoneNumber, gender })
        let updateCafeEmployee = null
        if (newCafeId) {
            updateCafeEmployee = this.#updateCafeEmployee({ employeeId, newCafeId })
        }
        // handle employee already in same cafe id?
        await Promise.all([updateEmployee, updateCafeEmployee])
        return newCafeId
    }

    async #updateCafeEmployee({ employeeId, newCafeId }) {
        const sql = `UPDATE employee_cafe SET cafe_id = $1 WHERE employee_id = $2`
        const params = [newCafeId, employeeId]
        return db.none(sql, params)
    }

    async #updateEmployee({ employeeId, name, emailAddress, phoneNumber, gender }) {
        const params = [employeeId]
        let sql = `UPDATE employees SET `
        const employeeSql = []

        // dynmically add positional args to sql and params
        if (name != null) {
            params.push(name)
            const len = params.length
            employeeSql.push('name = $' + len)
        }
        if (emailAddress != null) {
            params.push(emailAddress)
            const len = params.length
            employeeSql.push('email_address = $' + len)
        }
        if (phoneNumber != null) {
            params.push(phoneNumber)
            const len = params.length
            employeeSql.push('phone_number = $' + len)
        }
        if (gender != null) {
            params.push(gender)
            const len = params.length
            employeeSql.push('gender = $' + len)
        }

        // nothing to update
        if (employeeSql.length == 0) {
            return
        }

        // Get sql with params needed to be updated
        sql += employeeSql.join(' , ')
        sql += ' WHERE id = $1'
        return db.none(sql, params)
    }
}

module.exports = new UpdateEmployeeHandler()