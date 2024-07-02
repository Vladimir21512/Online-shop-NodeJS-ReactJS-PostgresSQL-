const nodemailer = require('nodemailer');

const sendEmail= async(order)=> {
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
    to: 'e5522316@gmail.com',
    subject: 'Новый заказ',
    text: 'Поступил новый заказ',
    html:'<p>ФИО: '+order.FIO+'</p><br/>'+'<p>ID пользователя:'+order.userId+'</p><br/>'+'<p>ID товара:'+order.productId+'</p><br/>'+'<p>Почта пользователя:'+order.email+'</p><br/>'+'<p>Название товара:'+order.product_name+'</p><br/>'+'<p>Цена товара:'
+order.product_price+'</p><br/>'+'<p>Телефон пользователя:'+order.phone_number+'</p><br/>'+'<p>Город:'+order.city+'</p><br/>'+'<p>Улица:'+order.street+'</p><br/>'+'<p>размер товара:'+order.size+'</p><br/>'+'<p>цвет товара:'+order.color+'</p><br/>'};

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

// Execute the function
//sendEmail().catch(console.error);

module.exports={
  sendEmail
}
