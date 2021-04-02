const router = require('express').Router();
const { User, Task, Comment, Project } = require('../../models');
const withAuth = require('../../utils/auth');

// Render profile page
// Need update to current user after log in
router.get('/', withAuth, async (req, res) => {
  try {
    const current_user = await User.findOne({
      where: { id: req.session.user_id },
    });
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment
        }
      
      ],
      where: { user_assigned_id: req.session.user_id },
    });

    const projects = await Project.findAll();

    console.log(current_user);

    //need current user
    res.render('profile', {
      current_user,
      tasks,
      users,
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
