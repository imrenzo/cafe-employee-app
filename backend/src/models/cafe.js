const db = require("../db/db")

// Cafe class that contains methods to validate its fields to match database constraints
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
        if (logo && (logo.size > 2 * 1024 * 1024)) { // logo size <= 2MB
            return false;
        }
        return true
    }
}

module.exports = Cafe