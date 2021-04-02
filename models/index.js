const User = require('./User');
const Task = require('./Task');
const Project = require('./Project');
const Comment = require('./Comment');
const Budget = require('./Budget');

// Need to define model relationships

// Task / User Relationship
// Tasks / User relationships
Task.belongsTo(User, {
  foreignKey: 'user_assigned_id',
});

User.hasMany(Task, {
  foreignKey: 'user_assigned_id',
});

// Project / User relationships
Project.belongsTo(User, {
  foreign_key: 'user_id',
});

User.hasMany(Project, {
  foreignKey: 'user_id',
});

// Project / Task relationships
Project.hasMany(Task, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE',
});

Task.belongsTo(Project, {
  foreignKey: 'project_id',
});

// Comment/Task relationships
Comment.belongsTo(Task, {
  foreignKey: 'task_id',
});

Task.hasMany(Comment, {
  foreignKey: 'task_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Export for use in controllers
module.exports = { User, Task, Project, Comment, Budget };
