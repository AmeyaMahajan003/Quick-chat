const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Db Connection Successful ');
});

db.on('err',()=>{
    console.log('Db Connection failed ');
});

module.exports = db;