require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const https = require('https');
const fs = require('fs');
const webSocket = require('socket.io');

const authRoutes = require('./routes/auth');
const supportRoutes = require('./routes/support');
const baseRoutes = require('./routes/base');
const trainingRoutes = require('./routes/training');
const verifyRoutes = require('./routes/verify');

const chatController = require('./controllers/chat');

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
        app.use('/api/verify', verifyRoutes);

        app.use(express.static('client/dist/client'));
        app.get('*', (req, res) => {
            res.sendFile(
                path.resolve(
                    __dirname, 'client', 'dist', 'client', 'index.html'
                )
            );
        });

        const credentials = {
            key: fs.readFileSync(path.resolve(__dirname, 'certificate', 'key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certificate', 'cert.pem'))
        };

        const httpsServer = https.createServer(credentials, app);

        app.listen(3001, () => {
            console.log(`HTTP server has been started on port 3001`);
        });

        const io = new webSocket.Server(httpsServer, { path: '/api/chat/' });
        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

        io.use(wrap(passport.authenticate('jwt', { session: false })));
        io.use((socket, next) => {
            if (socket.request.user) {
                next();
            } else {
                next(new Error('Unauthorized'))
            }
        });

        io.on('connection', chatController.connection,);

        httpsServer.listen(config.port, () => {
            console.log(`HTTPS server has been started on port ${config.port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

run();