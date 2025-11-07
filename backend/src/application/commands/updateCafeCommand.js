class UpdateCafeCommand {
    constructor({ cafeId, name, description, logo, location }) {
        this.cafeId = cafeId
        this.name = name
        this.description = description
        this.logo = logo
        this.location = location
    }
}

module.exports = UpdateCafeCommand