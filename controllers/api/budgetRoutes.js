const router = require('express').Router();
var sequelize = require('sequelize');
const { Budget } = require('../../models');
const withAuth = require('../../utils/auth');

// Render profile page
// Need update to current user after log in
router.get('/', withAuth, async (req, res) => {

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

// Posting a new expense item to the db
router.post('/', withAuth, async (req, res) => {
    try {
        const newExpense = await Budget.create({
            ...req.body
        });

        res.status(200).json(newExpense);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, (req, res) => {
    // update a budget by its `id` value
    Budget.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((updatedBudget) => res.json(updatedBudget))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const budgetData = await Budget.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!budgetData) {
            res.status(404).json({ message: 'No expense found with this id!' });
            return;
        }

        res.status(200).json(budgetData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;