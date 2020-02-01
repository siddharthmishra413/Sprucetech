const mongoose = require("mongoose");
// const User = require("./models/user.model");


//Export this function to server.js for the database connection
let databaseConnection = () => {
    
    mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose default connection is open to ${process.env.DB_URL}`);
    })

    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose default connection has occured ${err} error`);
    })

    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose default connection is disconnected`);
    })

    mongoose.connection.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongoose default connection is disconnected due to application termination`);
            process.exit(0);
        })
    })
}

module.exports = {
    databaseConnection
}


