// Utils class
require("dotenv").config()
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


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

  generateAccessToken(user) {
  return jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "30m" });
}

}

module.exports = new Utils();
