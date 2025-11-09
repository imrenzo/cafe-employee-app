const mediator = require('./mediator')

const handlers = {
    GetCafesByLocationQuery: require('./queries/handlers/getCafesByLocationHandler'),
    GetEmployeesByCafeQuery: require('./queries/handlers/getEmployeesByCafeHandler'),
    CreateNewCafeCommand: require('./commands/handlers/createNewCafeHandler'),
    CreateNewEmployeeCommand: require('./commands/handlers/createNewEmployeeHandler'),
    UpdateCafeCommand: require('./commands/handlers/updateCafeHandler'),
    UpdateEmployeeCommand: require('./commands/handlers/updateEmployeeHandler'),
    DeleteCafeCommand: require('./commands/handlers/deleteCafeHandler'),
    DeleteEmployeeCommand: require('./commands/handlers/deleteEmployeeHandler')
}

class MediatorManager {
    constructor() {
        this.mediator = mediator
        for (const key in handlers) {
            mediator.register(key, handlers[key])
        }
    }

    getMediator() {
        return this.mediator
    }
}

module.exports = new MediatorManager().getMediator()
