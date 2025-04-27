
const mongoose = require('mongoose');
const mongoURI ="mongodb://0.0.0.0/inotebook"

const connectToMongo = async () => {
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to MongoDB successfully");
    })
};

module.exports = connectToMongo;

