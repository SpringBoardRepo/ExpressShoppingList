class ExpressError extends Error {

    constructor(msg, statusCode) {
        super();

        this.msg = msg;
        this.statusCode = statusCode;
        console.log(this.stack);
    }
}

module.exports = ExpressError