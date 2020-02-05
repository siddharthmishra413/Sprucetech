const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: (userEmail, htmlData) => {
        return new Promise(resolve => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'care@transpero.com',
                    pass: 'p@ssw0rd1111'
                }
            });

            let mailOptions = {
                from: 'care@transpero.com', // sender address
                to: userEmail, // list of receivers
                subject: `Password update verification`, // Subject line
                html: htmlData
            };

            transporter.sendMail(mailOptions, (error, info) => {
                console.log(error)
                if (!info) return resolve('Email Not Sent');
                return resolve('Email Sent');
            })
        })
    }
};
