class Mediator {
    constructor() {
        this.handlers = {}
    }

    // Stores handlers
    register(type, handler) {
        this.handlers[type] = handler
    }

    // route base on query name
    async send(request) {
        const handler = this.handlers[request.constructor.name]
        if (!handler) throw new Error(`No handler for ${request.constructor.name}`)
        return handler.handle(request)
    }
}

module.exports = new Mediator()