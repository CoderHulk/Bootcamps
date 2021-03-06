const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const colors = require('colors');


// Load env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');



const app = express();
const PORT = process.env.PORT || 5000;

// custom middleware
app.use(logger);



// Body Parser
app.use(express.json());



// Dev logging middleware Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);


// Error Handler Middle ware
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log('App listening on port 5000!');
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)
    // close server and exit process
    server.close(() => process.exit(1));
});