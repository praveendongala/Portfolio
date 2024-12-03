const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send', (req, res) => {
  const { from_email, from_name, subject, message } = req.body;

  const mailOptionsToSelf = {
    from: from_email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `From: ${from_name}\nEmail: ${from_email}\n\n${message}`,
  };

  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to: from_email,
    subject: `Copy of your message: ${subject}`,
    text: `Hello ${from_name},\n\nThank you for reaching out!\n\n${message}\n\nBest regards,\n[Your Name]`,
  };

  transporter.sendMail(mailOptionsToSelf, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    transporter.sendMail(mailOptionsToUser, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Emails sent: ' + info.response);
    });
  });
});

module.exports = app;




// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Create a transporter object using Gmail service and authentication from .env
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Handle the POST request to send emails
// app.post('/send', async (req, res) => {
//   const { from_email, from_name, subject, message } = req.body;

//   const mailOptionsToSelf = {
//     from: from_email,
//     to: process.env.EMAIL_USER,
//     subject: subject,
//     text: `From: ${from_name}\nEmail: ${from_email}\n\n${message}`,
//   };

//   const mailOptionsToUser = {
//     from: process.env.EMAIL_USER,
//     to: from_email,
//     subject: `Copy of your message: ${subject}`,
//     text: `Hello ${from_name},\n\nThank you for reaching out!\n\n${message}\n\nBest regards,\n[Your Name]`,
//   };

//   try {
//     // Send the email to yourself (the admin)
//     await transporter.sendMail(mailOptionsToSelf);

//     // Send the confirmation email to the user
//     await transporter.sendMail(mailOptionsToUser);

//     // Send success response
//     return res.status(200).send('Emails sent successfully');
//   } catch (error) {
//     // Handle any errors that occur during the sending process
//     console.error('Error occurred:', error);
//     return res.status(500).send('Error sending emails: ' + error.toString());
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// module.exports = app;
