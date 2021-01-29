const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const authRoutes = require('./routes/auth');
const supportRoutes = require('./routes/support');
const baseRoutes = require('./routes/base');
const trainingRoutes = require('./routes/training');

const config = require('./config/config');

const app = express();

async function run() {
    try {
        await mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
            .then(() => console.log('MongoDB connected.'))
            .catch(error => console.log(error));

        app.use(passport.initialize());
        require('./middleware/passport')(passport);

        app.use(require('morgan')('dev'));
        app.use('/uploads', express.static('uploads'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(require('cors')());

        app.use('/api/auth', authRoutes);
        app.use('/api/support', supportRoutes);
        app.use('/api/base', baseRoutes);
        app.use('/api/training', trainingRoutes);

        app.use(express.static('client/dist/client'));
        app.get('*', (req, res) => {
            res.sendFile(
                path.resolve(
                    __dirname, 'client', 'dist', 'client', 'index.html'
                )
            );
        });

        app.listen(config.port, () => {
            console.log(`Server has been started on port ${config.port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

run();