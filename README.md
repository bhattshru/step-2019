# step-projector-app

For ProjectorServer

The quickest way to get started with express is to utilize the express generator

$ npm install -g express-generator@4    # Install Express generator globally
$ express ProductServer               # Generate an express project called ProductServer
$ cd ProductServer        
$ npm install                           # Install dependencies
$ npm start                             # Start the server


MongoDB install
npm install mongodb --save




STATUS CODES

exports.STATUS_CODE = {
    SERVER_ERROR : {
        CODE : 500,
        STATUS : "Server Error",
        MESSAGE : "Some error occured in server"
    },
    DB_ERROR : {
        CODE : 500,
        STATUS : "Database Error",
        MESSAGE : "Some error occured in the database"
    },
    INSUFFICIENT_PARAMS : {
        CODE : 400,
        STATUS : "Bad request",
        MESSAGE : "Insufficient parameters"
    },
    PRODUCT_NOT_FOUND : {
        CODE : 401,
        STATUS : "Not found",
        MESSAGE : "No such product found. Please check again"
    }
};
