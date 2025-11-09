// Object to store data to be passed to mediator
class DeleteEmployeeCommand {
    constructor({ employeeId }) {
        this.employeeId = employeeId
    }
}

module.exports = DeleteEmployeeCommand