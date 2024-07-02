const nodemailer = require('nodemailer');

const sendEmail= async(email, password)=> {
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
    subject: 'Сброс пароля',
    text: 'Ваш новый пароль от аккаунта',
    html: '<p>Ваш новый пароль от аккаунта:</p>'+password
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

module.exports={
  sendEmail
}