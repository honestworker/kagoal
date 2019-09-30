const nodeMailer = require("nodemailer");
const EmailTemplate = require('email-templates');

const config = require('../config');

const transporter = nodeMailer.createTransport({
  host: config.SMTP.host,
  port: config.SMTP.port,
  secure: false,
  auth: {
    user: config.SMTP.user,
    pass: config.SMTP.pass
  }
});

exports.sendConfirmEmail = (email, teamname, verify_link) => {
  const newEmail = new EmailTemplate({
    message: {
      from: config.SMTP.manager,
    },
    transport: transporter,
    views: {
      options: {
        extension: 'ejs'
      }
    },
    send: true,
    preview: false
  });
  
  newEmail
    .send({
      template: 'confirmEmail',
      message: {
        to: email,
        subject: "Please verify your email",
      },
      locals: {
        team_name: teamname,
        verify_link: config.SERVER.link + "/api/users/verify_email/" + verify_link,
        site_link: config.SERVER.link
      }
    })
    .then()
    .catch();
};

exports.sendInviteEmail = (email, from, role, teamname) => {
  const newEmail = new EmailTemplate({
    message: {
      from: config.SMTP.manager,
    },
    transport: transporter,
    views: {
      options: {
        extension: 'ejs'
      }
    },
    send: true,
    preview: false
  });
  
  newEmail
    .send({
      template: 'inviteEmail',
      message: {
        to: email,
        subject: "Invite from Kagoal",
      },
      locals: {
        team_name: teamname,
        from: from,
        role: role,
        site_link: config.SERVER.link
      }
    })
    .then()
    .catch();
};