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
        },
        {
            title: 'Project 2 Title',
        },
        {
            title: 'Project 3 Title',
        }
    ];

    // create function that bulk creates data using the array I created
    const seedProject = () => Project.bulkCreate(projectData);
    

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

    module.exports = seedProject