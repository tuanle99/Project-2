const router = require('express').Router();
const { User, Task, Comment, Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const current_user = await User.findOne({
      where: { id: req.session.user_id },
    });
    const projects = await Project.findAll({
      include: [
        {
          model: Task,
          include: [
            {
              model: Comment,
              include: [
                {
                  model: User,
                },
              ],
            },
          ],
        },
        {
          model: User,
        },
      ],
    });

    // Get the user data so I can populate the new task assignee selections
    const userData = await User.findAll();
    
    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    res.render('project', {
      logged_in: req.session.logged_in,
      projects,
      users,
      current_user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
    });
    res.redirect('/api/project');
    res.status(200).status(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/delete', async (req, res) => {
  try {
    const newProject = await Project.destroy({
      where: { id: req.body.id },
    });
    res.redirect('/api/project');
    res.status(200).status(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;