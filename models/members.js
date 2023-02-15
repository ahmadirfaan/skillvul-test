module.exports = (sequelize, DataTypes) => {
    return sequelize.define('members', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        type: DataTypes.STRING,
        exp: DataTypes.INTEGER
    }, {
        tableName: 'members',
        id: "id",
        firstName: 'first_name',
        lastName: 'last_name',
        username: 'username',
        password: 'passsword',
        type: 'type',
        exp: 'exp',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};