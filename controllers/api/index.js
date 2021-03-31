/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const projectRoutes = require('./projectRoutes');
const budgetRoutes = require('./budgetRoutes');

/* -------------------------------------------------------------------------- */
/*                       Define Middleware For This Path                      */
/* -------------------------------------------------------------------------- */

// Routes mounted to /api...
router.use('/users', userRoutes); // any path with /api/users use userRoutes that we imported above
router.use('/profile', profileRoutes);
router.use('/project', projectRoutes);
router.use('/budget', budgetRoutes);

/* -------------------------------------------------------------------------- */
/*                                Export Module                               */
/* -------------------------------------------------------------------------- */
module.exports = router;
