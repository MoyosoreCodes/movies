const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * * hashes password
 * @param {string} password
 * @returns
 */
var generatePassword = async function (password) {
  try {
    const hash = await bcrypt.hash(password, 8);
    //if process fails
    if (!hash || hash == undefined || hash == " ")
      throw "Error hashing the password";
    //if process is complete
    this.password = hash;
  } catch (err) {
    return err;
  }
};

/**
 * * compares password
 * @param {string} password
 * @returns {boolean}
 */
var verifyPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password.toString(), this.password);
    if (!match) return false;

    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const userObject = {
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: { type: String, required: true },
};

const userSchema = Schema(userObject, {
  timestamps: true,
});

userSchema.methods.generatePassword = generatePassword;
userSchema.methods.verifyPassword = verifyPassword;

const User = model("User", userSchema);

module.exports = { User };
