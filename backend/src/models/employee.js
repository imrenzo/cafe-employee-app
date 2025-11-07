const db = require("../db/db")

class Employee {
    static #emailRegEx = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
    static #phoneRegEx = new RegExp('^[8-9][0-9]{7}')
    static #genderList = ['male', 'female']

    static #isValidEmail(email) {
        return this.#emailRegEx.test(email);
    }

    static #isValidPhone(phone) {
        return this.#phoneRegEx.test(phone);
    }

    static #isValidGender(gender) {
        // Remove whitespaces and lowercase all alphabets
        const convertString = gender.trim().toLowerCase()
        return this.#genderList.includes(convertString)
    }

    static isValidEmployeeFields({ name, email, phone, gender }) {
        return this.isValidName(name)
            && this.#isValidEmail(email)
            && this.#isValidPhone(phone)
            && this.#isValidGender(gender)
    }

    static async isValidEmployeeId(employeeId) {
        const convertId = employeeId.trim()
        const { count } = await db.one('select COUNT(*) from employees WHERE id = $1', [convertId])
        return count == 1
    }

    static isValidName(name) {
        return name != null
    }
}

module.exports = Employee