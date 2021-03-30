const router = require('express').Router();
const { User, Task, Comment, Project } = require('../../models');

router.get('/', async (req, res) => {
  try {
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

    res.render('project', {
      projects,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
