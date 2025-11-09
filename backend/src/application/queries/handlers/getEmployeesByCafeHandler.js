const db = require('../../../db/db')
const dayjs = require('dayjs')
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

// Handles querying employees with database interactions
class GetEmployeesByCafeHandler extends AbstractHandlerInterface {
    async handle(query) {
        const cafe = query.cafe

        const validCafeName = this.#isValidCafe(cafe)
        if (!validCafeName) return []

        const params = []
        let sql = `
            SELECT 
                e.id, 
                e.name AS employee_name, 
                email_address, 
                phone_number, 
                start_date, 
                c.name AS cafe_name,
                e.gender
            FROM employee_cafe ec 
            JOIN cafes c ON ec.cafe_id = c.id 
            JOIN employees e ON e.id = ec.employee_id
        `

        if (cafe) {
            // use alias else error
            sql += ' WHERE c.name = $1'
            params.push(cafe)
        }
        const data = await db.any(sql, params)
        return this.#processData(data)
    }

    // {e.id, e.name, email_address, phone_number, start_date, c.name}
    #processData(data) {
        const includeDayDiff = data.map(d => {
            const startDate = new dayjs(d.start_date)
            const today = new dayjs()
            const dayDiff = today.diff(startDate, 'd')
            const tmp = {
                ...d,
                dayDiff: dayDiff
            }
            delete tmp.start_date
            return tmp
        })

        const comparator = obj => obj.dayDiff
        const sorted = includeDayDiff.toSorted(comparator)
        return sorted
    }

    async #isValidCafe(cafeName) {
        if (!cafeName) return true // no name provided
        const cafeNames = (await db.any('SELECT name FROM cafes')).map(obj => obj.name)
        return cafeNames.includes(cafeName)
    }
}




module.exports = new GetEmployeesByCafeHandler()