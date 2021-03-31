// Import Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // This is where we define helper functoins for handlebars
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// Stand up express server and specify port for listning
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js
const hbs = exphbs.create({
  helpers,
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}); // This is where I reference my helper.js I required above, to use helper functions defined in helper.js

hbs.handlebars.registerHelper('if_not_eq', function (a, b, opts) {
  if (a != b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Define and use session object
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define middleware for use on ALL paths starting with '/' on homepage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Lets us pull static resource for client script
app.use(routes);

// Syncs db and starts server listning
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('Now listening on http://localhost:' + PORT)
  );
});
