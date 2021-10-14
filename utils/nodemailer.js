const nodemailer = require("nodemailer");
const config = require('../config/config');

module.exports = async function mailer(data) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            pool: true,
            socketTimeout: 1200000,
            auth: {
                type: "OAuth2",
                user: config.outupEmail,
                refreshToken: config.refreshToken,
                clientId: config.CLIENTID,
                clientSecret: config.clientSecret,
                accessUrl: config.accessUrl
            },
        });

        transporter.verify((error, success) => {
            error ? console.log(error) :
             console.log('Server is ready to take our messages: ', success);
        });

        await transporter.sendMail(
            {
                from: `"OutUp Workouts" <${data.outupEmail}>`,
                to: `${data.email}`,
                subject: `${data.subject}`,
                html: `${data.html}`
            },
            (err, info) => {
                if (err) {
                    console.log(err);
                }
                console.log(info);
            });
    } catch (e) {
        console.log(e);
    }
};