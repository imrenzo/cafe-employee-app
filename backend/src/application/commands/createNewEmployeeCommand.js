// Object to store data to be passed to mediator
class CreateNewEmployeeCommand {
    constructor({ name, emailAddress, phoneNumber, gender, cafeId }) {
        this.name = name
        this.emailAddress = emailAddress
        this.phoneNumber = phoneNumber
        this.gender = gender.toLowerCase()
        this.cafeId = cafeId
    }
}

module.exports = CreateNewEmployeeCommand