/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const Budget = require('../models/Budget');

/* -------------------------------------------------------------------------- */
/*                            Define Finance Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of finance data to seed
    const budgetData = [
        {
            category: 'Rent',
            frequency: 'Monthly',
            amount: 1400,
        },
        {
            category: 'Electric Bill',
            frequency: 'Monthly',
            amount: 80,
        },
        {
            category: 'Groceries',
            frequency: 'Weekly',
            amount: 150,
        },
    ];

    // create function that bulk creates finance data using the array I created
    const seedBudget = () => Budget.bulkCreate(budgetData);
    
    module.exports = seedBudget;