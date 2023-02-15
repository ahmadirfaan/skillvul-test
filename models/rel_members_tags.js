module.exports = (sequelize) => {
    const relMemberTags = sequelize.define('rel_member_tags', {}, {
        tableName: 'rel_member_tags',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    relMemberTags.associate = function(models) {
        relMemberTags.hasMany(models.members, {
            foreignKey: 'member_id',
            as: 'members',
        });
        relMemberTags.hasMany(models.tags, {
            foreignKey: 'tag_id',
            as: 'tags',
        });
    };
    relMemberTags.beforeCreate((r) => r.id = uuidv4());
    return relMemberTags;
};