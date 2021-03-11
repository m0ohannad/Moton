const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to the database')
})
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connected to database: ${err}`)
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', routes);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '../../client', 'build', 'index.html')
    );
});
// }

app.use((req, res, next) => {
    //404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send({
        error,
    });
});

module.exports = app;