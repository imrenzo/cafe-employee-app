// Object to store data to be passed to mediator
class UpdateEmployeeCommand {
    constructor({ employeeId, name, emailAddress, phoneNumber, gender, newCafeId, start_date }) {
        this.employeeId = employeeId
        this.name = name
        this.emailAddress = emailAddress
        this.phoneNumber = phoneNumber
        this.gender = gender
        this.newCafeId = newCafeId
        this.start_date = start_date
    }
}

module.exports = UpdateEmployeeCommand