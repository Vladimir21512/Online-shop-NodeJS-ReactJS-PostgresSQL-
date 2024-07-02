const nodemailer = require('nodemailer');

const sendEmail= async(email, link)=> {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // enforcing secure transfer
    auth: {
      user: 'ultrasshop54@gmail.com',
      pass: 'lgrotkluvhyazemf'
    }
  });

  // Set up email data
  let mailOptions = {
    from: 'ultrasshop54@gmail.com',
    to: email,
    subject: 'Подтверждение аккаунта',
    text: 'Для подтверждения аккаунта перейдите по ссылке: '+link,
    html:'<h1>Для потверждения аккаунта перейдите по ссылке: </h1>'+'<a href="'+link+'">'+link+'</a>'
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

// Execute the function
//sendEmail().catch(console.error);

module.exports={
  sendEmail
}
// import { createTransport } from 'nodemailer';

// const sendEmail= async(email, link)=> {
//   // Create a transporter object using the default SMTP transport
//   let transporter = createTransport({
//     service: 'gmail',
//     secure: true, // enforcing secure transfer
//     auth: {
//       user: 'ultrasshop54@gmail.com',
//       pass: 'lgrotkluvhyazemf'
//     }
//   });

//   // Set up email data
//   let mailOptions = {
//     from: 'ultrasshop54@gmail.com',
//     to: email,
//     subject: 'Подтверждение аккаунта',
//     text: 'Для подтверждения аккаунта перейдите по ссылке: '+link,
//     html:'<h1>Для потверждения аккаунта перейдите по ссылке: </h1>'+'<a href="'+link+'">'+link+'</a>'
//   };

//   // Send email
//   let info = await transporter.sendMail(mailOptions);

//   console.log('Message sent: %s', info.messageId);
// }

// // Execute the function
// //sendEmail().catch(console.error);

// export default{
//   sendEmail
// }