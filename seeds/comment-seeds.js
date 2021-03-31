/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const Comment = require('../models/Comment');

/* -------------------------------------------------------------------------- */
/*                            Define Data to Inject                           */
/* -------------------------------------------------------------------------- */
// Define array of data to seed
const commentData = [
  {
    comment: 'Comment 1',
    user_id: 1,
    task_id: 1,
  },
  {
    comment: 'Comment 2',
    user_id: 2,
    task_id: 2,
  },
  {
    comment: 'Comment 3',
    user_id: 3,
    task_id: 3,
  },
];

// create function that bulk creates data using the array I created
const seedComment = () => Comment.bulkCreate(commentData);

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

module.exports = seedComment;
