/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */
    // Brings in the imported nodemailer dependency from server js?
    const router = require('express').Router();
    const nodemailer = require('nodemailer');

/* -------------------------------------------------------------------------- */
/*                                Define Routes                               */
/* -------------------------------------------------------------------------- */

// Routes mounted to /api/nodemailer...

    router.post('/', async (req,res) => {

        // Generate SMTP service account from ethereal.email
            /*
                This was done outside this script- acct details can be found
                within nodemailerEtherealAct directory within this repo (directory is at root level)
                See creds I use in transporter object below
            */
        
        // Capture what email comes from the client request to send a message to (req.body example)
        /*
            {
                "email": "emailaddresstosendto@email.com" // provide our users email stuff in req body for sending to
                "content": "whatever text or html I want to send"
            }
        */

        // Destructure req.body into email and content variables to inser into message object below
        const {email, content} = req.body;
        

        // Create a SMTP transporter object (re-usable) via nodemailer method
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'katelin.weber@ethereal.email',
                pass: 'tK8RBVJjFMnUb5gwkQ'
            }
        });

        // Define a message to send
        const message = {
            from: '"FamilyManager" <FamilyManager@example.com>', // sender address
            to: `${email}`, // who we send it to should come from the req.body (I define this above)
            subject: "✔ My Tasks Today", // Subject line
            text: `Heres whats on the agenda today! \n ${content}`, // plain text body
            html: content
        }

        // put content into the send mail method from nodemailer transporter object
        let info = await transporter.sendMail(message);
            
        // log what message was sent
        console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // Provide a response
        res.send('task summary email sent!')
    });


/* -------------------------------------------------------------------------- */
/*                               Export Module                                */
/* -------------------------------------------------------------------------- */

    module.exports = router;