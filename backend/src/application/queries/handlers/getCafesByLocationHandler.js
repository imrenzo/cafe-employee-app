const db = require('../../../db/db')
const AbstractHandlerInterface = require('../../abstractHandlerInterface');

class GetCafesByLocationHandler extends AbstractHandlerInterface {
    async handle(query) {
        console.log("GetCafesIn " + JSON.stringify(query))
        const location = query.location
        console.log(location)

        const validLocation = await this.#isValidLocation(location)
        if (!validLocation) return []

        const params = []
        let queryCafesString = 'SELECT * FROM cafes'
        if (location) {
            queryCafesString += ' WHERE location = $1'
            params.push(location)
        }
        const cafesQuery = db.any(queryCafesString, params)
        const employeesQuery = db.any('SELECT employee_id, cafe_id FROM employee_cafe')
        const [cafes, employees] = await Promise.all([cafesQuery, employeesQuery])
        return this.#processData(cafes, employees)
    }

    #processData(cafes, employees) {
        // Add employees field to cafes
        const res = cafes.map(cafe => {
            const cafeId = cafe.id
            const cafeEmployees = employees
                .filter(c => c.cafe_id == cafeId) // Filter for employees belonging to that cafe
                .map(c => c.employee_id) // Get employees id for that cafe
            return {
                ...cafe,
                employees: cafeEmployees // contains id of all cafe employees
            }
        })

        // Sorted by the highest number of employees first
        const comparator = cafe => cafe.employees.length
        const sorted = res.toSorted(comparator)
        return sorted
    }

    async #isValidLocation(location) {
        if (!location) return true // no location provided
        const cafeLocations = (await db.any('SELECT location FROM cafes')).map(obj => obj.location)
        return cafeLocations.includes(location)
    }
}

module.exports = new GetCafesByLocationHandler()