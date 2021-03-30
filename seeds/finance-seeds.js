/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const Finance = require('../models/Finance');

/* -------------------------------------------------------------------------- */
/*                            Define Finance Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of finance data to seed
    const financeData = [
        {
            family_name: 'John Badibanga',
            age: 23,
            school_year: 'senior',
            monthly_budget: 1000,
            reward: 100
        },
        {
            family_name: 'Mark Badibanga',
            age: 21,
            school_year: 'junior',
            monthly_budget: 1000,
            reward: 100
        },
        {
            family_name: 'Joseph Badibanga',
            age: 19,
            school_year: 'sophomore',
            monthly_budget: 1000,
            reward: 100
        }
    ];

    // create function that bulk creates finance data using the array I created
    const seedFinance = () => Finance.bulkCreate(financeData);
    
    module.exports = seedFinance;


































// /* -------------------------------------------------------------------------- */
// /*                             Import Dependencies                            */
// /* -------------------------------------------------------------------------- */

// const Comment = require('../models/Comment')

// /* -------------------------------------------------------------------------- */
// /*                            Define Data to Inject                           */
// /* -------------------------------------------------------------------------- */
//     // Define array of data to seed
//     const commentData = [
//         {
//             comment: 'Comment from user 1 on task 1',
//             user_id: 1,
//             task_id: 1
//         },
//         {
//             comment: 'Comment from user 2 on task 2',
//             user_id: 2,
//             task_id: 2
//         },
//         {
//             comment: 'Comment from user 3 on task 3',
//             user_id: 3,
//             task_id: 3
//         }
//     ];

//     // create function that bulk creates data using the array I created
//     const seedComment = () => Comment.bulkCreate(commentData);
    

// /* -------------------------------------------------------------------------- */
// /*                              Export the Module                             */
// /* -------------------------------------------------------------------------- */

//     module.exports = seedComment