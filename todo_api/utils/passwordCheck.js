const bcrypt = require("bcrypt");
const UsersModel = require("../models/users");

const passwordCheck = async (nim, password) => {
  const userData = await UsersModel.findOne({ where: { nim: nim } });
  const compare = await bcrypt.compare(password, userData.password);
  return { userData, compare };
};

module.exports = passwordCheck;
