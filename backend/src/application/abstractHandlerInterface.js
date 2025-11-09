// "interface" to define handlers that will interact with database
class AbstractHandlerInterface {
    // Method called by mediator to perform query/command on database
    async handle() {
        throw new Error('not implemented');
    }
}

module.exports = AbstractHandlerInterface