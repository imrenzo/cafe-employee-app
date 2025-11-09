// Object to store data to be passed to mediator
class CreateNewCafeCommand {
    constructor({ name, description, logo, location }) {
        this.name = name
        this.description = description
        this.logo = logo
        this.location = location.toLowerCase()
    }
}

module.exports = CreateNewCafeCommand