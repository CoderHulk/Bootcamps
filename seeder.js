const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


// Load env vars
dotenv.config({ path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to data base
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Delete the Data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Deleted...'.yellow.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


// calling the functions for terminal
if(process.argv[2] === '-i') {
    importData(); // node seeder -i ->  in terminal
} else if(process.argv[2] === '-d') {
    deleteData(); // node seeder -d
}