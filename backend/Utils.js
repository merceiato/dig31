// Utils class
const crypto = require("crypto");

class Utils {
  // takes a password and hashes it (encrypts)
  hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 2048, 32, "sha512")
      .toString("hex");
    return [salt, hash].join("$");
  }

  // checks a password against the original and returns true/false if they verify
  verifyPassword(password, original) {
    const originalHash = original.split("$")[1];
    const salt = original.split("$")[0];
    const hash = crypto
      .pbkdf2Sync(password, salt, 2048, 32, "sha512")
      .toString("hex");
    return hash === originalHash;
  }
}

module.exports = new Utils();
