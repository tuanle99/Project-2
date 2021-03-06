/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const Task = require('../models/Task')

/* -------------------------------------------------------------------------- */
/*                            Define Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of data to seed
    const taskData = [
        {
            title: 'Task 1 Title',
            description: 'Task 1 Description..',
            due_date: '01/01/2021',
            user_assigned_id: 1,
            is_complete:0,
            created_by:1,
            project_id: 1
        },
        {
            title: 'Task 2 Title',
            description: 'Task 2 Description..',
            due_date: '02/02/2021',
            user_assigned_id: 2,
            is_complete:1,
            created_by:2,
            project_id: 2
        },
        {
            title: 'Task 3 Title',
            description: 'Task 3 Description..',
            due_date: '03/03/2021',
            user_assigned_id: 3,
            is_complete:0,
            created_by:3,
            project_id: 3
        },
    ];

    // create function that bulk creates data using the array I created
    const seedTask = () => Task.bulkCreate(taskData);
    

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

    module.exports = seedTask