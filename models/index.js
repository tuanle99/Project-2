const User = require('./User');
const Task = require('./Task');
const Project = require('./Project');

// Need to define model relationships

// Project / User relationships
User.hasMany(Project, {
    foreignKey: 'user_id'
});

Project.belongsTo(User, {
    foreign_key: 'user_id'
});

// Tasks / User relationships
User.hasMany(Task, {
    foreignKey: 'user_id'
});

Task.belongsTo(User, {
    foreignKey: 'user_id'
})

// Project / Task relationships
Project.hasMany(Task, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Project, {
    foreignKey: 'project_id'
});

// Export for use in controllers
module.exports = { User, Task, Project };
