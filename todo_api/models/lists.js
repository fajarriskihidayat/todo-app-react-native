const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");
const Users = require("./users");

class List extends Model {}

List.init(
  {
    user_nim: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "nim",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tanggal: {
      type: DataTypes.DATE,
    },
    waktu: {
      type: DataTypes.TIME,
    },
    kegiatan: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Belum Selesai", "Selesai"),
    },
  },
  {
    sequelize,
    modelName: "List",
  }
);

module.exports = List;
