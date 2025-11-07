class AbstractHandlerInterface {
    async handle() {
        throw new Error('not implemented');
    }
}

module.exports = AbstractHandlerInterface