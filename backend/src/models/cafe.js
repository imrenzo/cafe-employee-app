const db = require("../db/db")

class Cafe {
    static async isValidCafeId(cafeId) {
        // Remove whitespaces (if any)
        const convertId = cafeId.trim()
        const { count } = await db.one('select COUNT(*) from cafes WHERE id = $1', [convertId])
        return count == 1
    }

    static isValidCafeFields({ name, description, logo, location }) {
        const arr = [name, description, location]
        const hasNull = arr.some(e => e == null)
        if (hasNull) return false

        return true
    }
}

module.exports = Cafe