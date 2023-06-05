const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./TechBlog/api/controlllers/routes');
const helpers = require('./TechBlog/utils/helpers');

const sequelize = require('./TechBlog/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
//app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'TechBlog', 'views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT', PORT));
});


// 1. set up models
// done
// 2. set up server
// done
// 3. set up seed and run
// done
// 4. set up views

// 5. set up html routes

// 6. set up api routes

// 7 . set up js files for forms