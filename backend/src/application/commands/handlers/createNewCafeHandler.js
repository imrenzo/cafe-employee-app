const db = require('../../../db/db');
const Cafe = require('../../../models/cafe');
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

class CreateNewCafeHandler extends AbstractHandlerInterface {
    async handle(command) {
        const { name, description, logo, location } = command;
        if (!Cafe.isValidCafeFields( { name, description, logo, location } )) {
            throw new Error("Invalid cafe fields")
        }

        const sql = `
            INSERT INTO cafes (name, description, logo, location) 
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `
        let newLogo = logo
        if (!logo) {
            newLogo = null
        }
        const params = [name, description, newLogo, location]
        const new_id = await db.one(sql, params)
        return new_id
    }
}

module.exports = new CreateNewCafeHandler()