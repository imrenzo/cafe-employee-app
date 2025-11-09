// Object to store data to be passed to mediator
class GetCafesByLocationQuery {
    constructor({ location }) {
        if (!location) { // location not provided
            this.location = location
        } else {
            this.location = location.toLowerCase()
        }
    }
}

module.exports = GetCafesByLocationQuery