/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const User = require('../models/User')

/* -------------------------------------------------------------------------- */
/*                            Define Data to Inject                           */
/* -------------------------------------------------------------------------- */
    // Define array of data to seed
    const userData = [
        {
            name: 'User1',
            is_admin: true,
            role: 'Parent',
            email: 'user1@parent1.com',
            birthday: '09/01/2021',
            password: 'password1'
        },
        {
            name: 'User2',
            is_admin: true,
            role: 'Parent',
            email: 'user2@parent2.com',
            birthday: '10/01/2021',
            password: 'password2'
        },
        {
            name: 'User3',
            is_admin: true,
            role: 'Child',
            email: 'user3@child1.com',
            birthday: '11/01/2021',
            password: 'password3'
        },
    ];

    // create function that bulk creates data using the array I created
    const seedUser = () => User.bulkCreate(userData);
    

/* -------------------------------------------------------------------------- */
/*                              Export the Module                             */
/* -------------------------------------------------------------------------- */

    module.exports = seedUser