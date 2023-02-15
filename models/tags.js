module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tags', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
    }, {
        tableName: 'tags',
        id: "id",
        name: "name",
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};