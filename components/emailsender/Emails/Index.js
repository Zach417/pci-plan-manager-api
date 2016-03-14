fs = require('fs');

module.exports = {
    PasswordReset: fs.readFileSync("./components/EmailSender/Emails/PasswordReset.html", "utf8"),
}
