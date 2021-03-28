/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const Comment = require('../models/Comment')

/* -------------------------------------------------------------------------- */
/*                            Define Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of data to seed
    const commentData = [
        {
            comment: 'Comment from user 1 on task 1',
            user_id: 1,
            task_id: 1
        },
        {
            comment: 'Comment from user 2 on task 2',
            user_id: 2,
            task_id: 2
        },
        {
            comment: 'Comment from user 3 on task 3',
            user_id: 3,
            task_id: 3
        }
    ];

    // create function that bulk creates data using the array I created
    const seedComment = () => Comment.bulkCreate(commentData);
    

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

    module.exports = seedComment