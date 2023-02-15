module.exports = (sequelize, DataTypes) => {
    const relMemberTags = sequelize.define('relMemberTags', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        members_id: DataTypes.INTEGER,
        tags_id: DataTypes.INTEGER
    }, {
        tableName: 'rel_members_tags',
        id: "id",
        members_id: 'members_id',
        tags_id: 'tags_id',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return relMemberTags;
};