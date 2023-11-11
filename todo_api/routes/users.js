const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UsersModel = require("../models/users");
const ListsModel = require("../models/lists");
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  const users = await UsersModel.findAll();

  res.status(200).json({
    data: users,
    metadata: "Get all users",
  });
});

router.post("/", async (req, res) => {
  const { nim, nama, password } = req.body;

  const encryptPwd = await bcrypt.hash(password, 10);

  if (!nim || !nama || !password) {
    res.status(400).json({
      error: "Bad request",
    });
  } else {
    const users = await UsersModel.create({
      nim,
      nama,
      password: encryptPwd,
    });
    res.status(200).json({
      data: users,
      metadata: "Create user success",
    });
  }
});

router.put("/", async (req, res) => {
  const { nim, nama, password, passwordBaru } = req.body;

  const user = await UsersModel.findOne({ where: { nim: nim } });
  if (!user) {
    res.status(404).json({
      error: "User Not Found",
    });
  } else {
    const check = await passwordCheck(nim, password);
    const encryptPwd = await bcrypt.hash(passwordBaru, 10);

    if (check.compare === true) {
      const users = await UsersModel.update(
        {
          nama,
          password: encryptPwd,
        },
        { where: { nim: nim } }
      );

      res.status(200).json({
        user: { updated: users[0] },
        metadata: "Update user success",
      });
    } else {
      res.status(400).json({
        error: "Bad request",
      });
    }
  }
});

router.delete("/", async (req, res) => {
  const { nim } = req.body;

  const user = await UsersModel.destroy({ where: { nim: nim } });

  if (!user) {
    res.status(404).json({
      error: "User Not Found",
    });
  } else {
    res.status(200).json({
      user: { deleted: user },
      metadata: "Delete user success",
    });
  }
});

router.post("/login", async (req, res) => {
  const { nim, password } = req.body;

  const check = await passwordCheck(nim, password);

  if (check.compare === true) {
    res.status(200).json({
      user: check.userData,
      metadata: "Login success",
    });
  } else {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

module.exports = router;
