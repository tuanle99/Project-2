/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

const Project = require('../models/Project');

/* -------------------------------------------------------------------------- */
/*                            Define Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of data to seed
    const projectData = [
        {
            title: 'Project 1 Title',
            user_id: 1
        },
        {
            title: 'Project 2 Title',
            user_id: 2
        },
        {
            title: 'Project 3 Title',
            user_id: 3
        }
    ];

    // create function that bulk creates data using the array I created
    const seedProject = () => Project.bulkCreate(projectData);
    

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

    module.exports = seedProject