
/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */const router = require("express").Router();
const { User, Task, Project, Comment } = require("../models");
// const withAuth = require("../utils/auth");

/* -------------------------------------------------------------------------- */
/*                                Define Routes                               */
/* -------------------------------------------------------------------------- */

    // base route for page

/* ------------------------------- GET Routes ------------------------------- */

  // Route to render home page with latest task data
   // First time site visit with no prior login return dash_home with no create / edit options
   router.get('/', async (req, res) => {
        
    try{
        // Get the data from the blogs DB
        const taskData = await Task.findAll({
            include: [
                {
                    model: User
                },
                {
                  model: Project
                },
                {
                  model: Comment
                }
            ],
        });
        
        // Serialize data so the template can read it
        const tasks = taskData.map((task) => task.get({plain : true}));
          console.log(tasks);
        
        // Pass serialized data and session flag into db
        res.render('homepage', {
            tasks,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

/*
  // Use withAuth middleware to prevent access to route
  router.get("/profile", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
      });

      const user = userData.get({ plain: true });

      res.render("profile", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
*/

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

/* ------------------------------- POST Routes ------------------------------ */

    // Posts new tasks to DB
            // Body Example:
            /*
                {
                    "title": "task title",
                    "description": "task description",
                    "due date": "01/16/2022",
                    "created_by": 2,
                    "assigned_to": 2,
                    "project_id": 1 (can be null)
                }
            */

            //Route
          /*
            router.post('/comment', async (req, res) => {
              console.log(`reqeust body is ${JSON.stringify(req.body)}`)
              try {
                  const commentData = await Comment.create(req.body);
                  res.status(200).json(commentData);
              } 
              catch (err) {
                  res.status(400).json(err);
              }
          });
        */

/* -------------------------------------------------------------------------- */
/*                                Export Module                               */
/* -------------------------------------------------------------------------- */

module.exports = router;
