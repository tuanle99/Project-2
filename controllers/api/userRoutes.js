/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const { User } = require('../../models');

/* -------------------------------------------------------------------------- */
/*                                Define Routes                               */
/* -------------------------------------------------------------------------- */

// Routes mounted to /api/users/...

/* ------------------------------- Get Routes ------------------------------- */
// Brings up the login page if user clicks login in nav
router.get('/login', async (req, res) => {  
    try{
        // Render the login screen and the status if they are logged in
        res.render('login', {
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Brings up the signup page if user clicks they need to create new crednetials on login page
router.get('/signup', async (req, res) => {
    try{
        // Render the login screen and the status if they are logged in
        res.render('signup', {
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})


/* ------------------------------- Post Routes ------------------------------ */

// Posts new user credentials to the database
    // Body Example:
    /*
        {
            "email": "email1@email.com",
            "user_name": "username1",
            "password": "password2"
        }
    */
    //Route
    router.post('/signup', async (req, res) => {
        try { 
            // create a new user based on submitted information
            const userData = await User.create(req.body);
            console.log(`user data created`);

            // Save information about the session, the user is now logged in
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.user_name = userData.user_name;
                req.session.logged_in = true;
        
                // Send a success back with user data in response
                res.status(200).json(userData);
            });
        } 
        // If failure, create failure
        catch (err) {
            res.status(400).json(err);
        }
    });


// Route to login user and compare credentials
router.post('/login', async (req, res) => {
    try {

        console.log(`trying login route with credentials ${JSON.stringify(req.body)}`)
    
        // set userData equal to the user email submitted
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(`user data found is ${userData.email} and ${userData.password} and ${userData.user_name}`);
    
        // If user data is not provided, send a message to provide it
        if (!userData) {
            console.log(`into if no user data block`)
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        else {
            // set validPassword to be equal to the passwordcheck completed against the db and the body (NOT EXECUTING THIS!)
            const validPassword = await userData.checkPassword(req.body.password);
            console.log(`valid password result it ${validPassword}`); 
        
            // If password entered does not match password in DB...notify them and return
            if (!validPassword) {
                res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
                return;
            }
        
            // Otehrwise provide message that they are logged in, and save the session while setting the session user id
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.user_name = userData.user_name;
                req.session.logged_in = true;
                res.json({ user: userData, message: 'You are now logged in!' });
            });
        }
        
    } 
    // If anything goes wrong ahead of that log an error
    catch (err) {
      res.status(400).json(err);
    }

});

// Route to end session and log out user
 router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

module.exports = router;

