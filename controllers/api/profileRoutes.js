const router = require('express').Router();
var sequelize = require('sequelize');
const { User, Task, Comment, Project } = require('../../models');

// Render profile page
// Need update to current user after log in
router.get('/', async (req, res) => {
  try {
    const current_user = await User.findOne({ where: { id: 1 } });
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: { user_assigned_id: 1 },
    });
    //need current user
    res.render('profile', {
      current_user,
      tasks,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
