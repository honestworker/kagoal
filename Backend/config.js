// config.js

module.exports = {
  DB: 'mongodb://localhost:27017/kagoal',
  SMTP: {
    host: 'smtp.sendgrid.net',
    user: 'apikey',
    pass: 'pass',
    port: 587,
    manager: 'info@manager.com',
  },
  SERVER: {
    link: 'https://localhost/',
    port: 5005
  }
}