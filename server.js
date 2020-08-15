const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(5000, () => {
    console.log('App listening on port 5000!');
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});


