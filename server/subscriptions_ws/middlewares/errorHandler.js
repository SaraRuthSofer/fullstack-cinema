// errorHandler.js

function errorHandler(err, req, res, next) {
    // אם כבר נשלחה תשובה, עבור ל-Express
    if (res.headersSent) {
        return next(err);
    }
    // קוד סטטוס ברירת מחדל
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
