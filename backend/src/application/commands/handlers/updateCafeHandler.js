const AbstractHandlerInterface = require("../../abstractHandlerInterface");
const Cafe = require("../../../models/cafe");
const db = require("../../../db/db");

class UpdateCafeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { cafeId, name, description, logo, location } = command;
        // validate inputs
        if (cafeId && !(await Cafe.isValidCafeId(cafeId))) {
            throw new Error("Invalid cafe id")
        }
        if (!Cafe.isValidCafeFields({ name, description, logo, location })) {
            throw new Error("Invalid cafe fields")
        }

        const params = [cafeId]
        let sql = `UPDATE cafes SET`
        const tmpSql = []

        // dynmically add positional args to sql and params
        if (name != null) {
            params.push(name)
            const len = params.length
            tmpSql.push('name = $' + len)
        }
        if (description != null) {
            params.push(description)
            const len = params.length
            tmpSql.push('description = $' + len)
        }
        if (logo != null) {
            params.push(logo)
            const len = params.length
            tmpSql.push('logo = $' + len)
        }
        if (location != null) {
            params.push(location)
            const len = params.length
            tmpSql.push('location = $' + len)
        }
        // Get sql with params needed to be updated
        sql += tmpSql.join(' , ')

        sql += ' WHERE id = $1'
        await db.none(sql, params)
        return cafeId
    }
}

module.exports = new UpdateCafeHandler()