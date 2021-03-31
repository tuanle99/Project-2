const router = require('express').Router();
var sequelize = require('sequelize');
const { Budget } = require('../../models');

// Render profile page
// Need update to current user after log in
router.get('/', async (req, res) => {

    try {
        // Get the budget data so we can populate that on the Budget page
        const budgetData = await Budget.findAll();

        // Serialize data so the template can read it
        const budgets = budgetData.map((budget) => budget.get({ plain: true }));
        console.log(budgets);

        // Pass serialized data and session flag into db
        res.render('budget', {
            budgets,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;