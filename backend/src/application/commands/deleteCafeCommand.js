// Object to store data to be passed to mediator
class DeleteCafeCommand {
    constructor({ cafeId }) {
        this.cafeId = cafeId
    }
}

module.exports = DeleteCafeCommand