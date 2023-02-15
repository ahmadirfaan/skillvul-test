module.exports = {
    build: (object, message, statusCode) => {
        return {
            status: statusCode,
            data: object,
            message: message,
        };
    },
    error: (message, statusCode) => {
        return {
            status: statusCode,
            data: null,
            message: message,
        };
    },
};