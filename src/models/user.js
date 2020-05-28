const { DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
    });
    User.beforeCreate((user) => (user.id = uuid.v1()));
    return User;
};
