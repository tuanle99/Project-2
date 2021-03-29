/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const router = require('express').Router();
    const userRoutes = require('./userRoutes');   

/* -------------------------------------------------------------------------- */
/*                       Define Middleware For This Path                      */
/* -------------------------------------------------------------------------- */

    // Routes mounted to /api...
    router.use('/users', userRoutes); // any path with /api/users use userRoutes that we imported above

/* -------------------------------------------------------------------------- */
/*                                Export Module                               */
/* -------------------------------------------------------------------------- */
    module.exports = router;
