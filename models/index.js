const User = require('./User');
const Task = require('./Task');
const Project = require('./Project');

// Need to define model relationships

// Project has many Tasks
// Tasks belong to User
// Tasks belong to Project
// User has many Tasks


module.exports = { User, Task, Project };
