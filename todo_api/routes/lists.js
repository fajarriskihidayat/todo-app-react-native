const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const ListsModel = require("../models/lists");
const UsersModel = require("../models/users");

router.get("/all/:nim", async (req, res) => {
  const { nim } = req.params;

  const list = await ListsModel.findAll({
    where: { user_nim: nim },
  });
  res.status(200).json({
    data: list,
    metadata: "Get all lists by nim",
  });
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  const list = await ListsModel.findOne({
    where: { id: id },
  });
  res.status(200).json({
    data: list,
    metadata: "Get list by id",
  });
});

router.post("/", async (req, res) => {
  const { user_nim, tanggal, waktu, kegiatan } = req.body;

  if (!user_nim || !tanggal || !kegiatan || !waktu) {
    res.status(400).json({
      error: "Bad request",
    });
  } else {
    const list = await ListsModel.create({
      user_nim,
      tanggal,
      waktu,
      kegiatan,
      status: "Belum Selesai",
    });

    res.status(200).json({
      data: list,
      metadata: "Create list success",
    });
  }
});

router.put("/", async (req, res) => {
  const { id, tanggal, waktu, kegiatan } = req.body;

  const list = await ListsModel.update(
    {
      tanggal,
      waktu,
      kegiatan,
    },
    { where: { id: id } }
  );

  if (list[0] === 1) {
    res.status(200).json({
      list: { updated: list[0] },
      metadata: "Update list success",
    });
  } else {
    res.status(404).json({
      error: "List not found",
    });
  }
});

router.put("/finish/:id", async (req, res) => {
  const { id } = req.params;

  const list = await ListsModel.update(
    {
      status: "Selesai",
    },
    { where: { id: id } }
  );

  if (list[0] === 1) {
    res.status(200).json({
      list: { updated: list[0] },
      metadata: "List diselesaikan",
    });
  } else {
    res.status(404).json({
      error: "List not found",
    });
  }
});

router.put("/unfinish/:id", async (req, res) => {
  const { id } = req.params;

  const list = await ListsModel.update(
    {
      status: "Belum Selesai",
    },
    { where: { id: id } }
  );

  if (list[0] === 1) {
    res.status(200).json({
      list: { updated: list[0] },
      metadata: "List tidak diselesaikan",
    });
  } else {
    res.status(404).json({
      error: "List not found",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const list = await ListsModel.destroy({ where: { id: id } });

  if (list) {
    res.status(200).json({
      list: { deleted: list },
      metadata: "Delete list success",
    });
  } else {
    res.status(404).json({
      error: "List not found",
    });
  }
});

router.get("/search", async (req, res) => {
  const { nim, kegiatan } = req.query;

  const lists = await ListsModel.findAll({
    where: {
      [Op.and]: [
        { user_nim: nim },
        {
          kegiatan: {
            [Op.like]: `%${kegiatan}%`,
          },
        },
      ],
    },
  });

  res.status(200).json({
    data: lists,
    metadata: "Get all lists by kegiatan",
  });
});

/*router.post("/search", async (req, res) => {
  const { nim, nama, kegiatan } = req.query;

  if (nim) {
    const user = await UsersModel.findOne({ where: { nim: nim } });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
    } else {
      const list = await ListsModel.findAll({
        attributes: ["user_nim", "jadwal", "kegiatan", "status"],
        where: { user_nim: nim },
      });
      res.status(200).json({
        data: list,
        metadata: "Get all lists by nim",
      });
    }
  } else if (nama) {
    const user = await UsersModel.findOne({ where: { nama: nama } });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
    } else {
      const list = await ListsModel.findAll({
        attributes: ["user_nim", "jadwal", "kegiatan", "status"],
        where: { user_nim: user.nim },
      });
      res.status(200).json({
        data: list,
        metadata: "Get all lists by nama",
      });
    }
  } else if (kegiatan) {
    const list = await ListsModel.findOne({
      where: {
        kegiatan: {
          [Op.like]: `%${kegiatan}%`,
        },
      },
    });

    const lists = await ListsModel.findAll({
      attributes: ["user_nim", "jadwal", "kegiatan", "status"],
      where: {
        kegiatan: {
          [Op.like]: `%${kegiatan}%`,
        },
      },
    });

    if (!list) {
      res.status(404).json({
        error: "Lists not found",
      });
    } else {
      res.status(200).json({
        data: lists,
        metadata: "Get all lists by kegiatan",
      });
    }
  } else {
    res.status(400).json({
      error: "Bad request",
    });
  }
});*/

module.exports = router;
