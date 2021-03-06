'use strict';

// Only need for local development
const dotenv = require('dotenv')
const ImageStore = require('./app/utils/image-store');
const Hapi = require('@hapi/hapi');
const utils = require('./app/api/utils');


const server = Hapi.server({
  port: process.env.PORT || 4000,
  routes : { "cors": true }
});


// db.js creates a connection to the mongo database
require('./app/models/db');
server.validator(require('@hapi/joi'));

// Cloudinary Credentials
const credentials = {
  cloud_name: process.env.name,
  api_key: process.env.key,
  api_secret: process.env.secret
};
//
// Only need for local development
// if the .env file cant be found handle the error
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  // Register plugins
  await server.register(require('@hapi/inert'));
  await server.register(require('@hapi/vision'));
  await server.register(require('@hapi/cookie'));
  await server.register(require('hapi-auth-jwt2'));
  await  server.register({
    plugin: require('disinfect'),
    options: {
      disinfectQuery: true,
      disinfectParams: true,
      disinfectPayload: true
    }
  });

  // Configure Cloudinary
  ImageStore.configure(credentials);

  // setup the paths to views, layouts and partials &
  // set the templating engine to handlebars
  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });


  // Initialize the cookie plugin
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    }
  });

  //JWT authentication
  server.auth.strategy('jwt', 'jwt',
    {
      key: process.env.jwt_password,
      validate: utils.validate,
      verifyOptions: { algorithms: ['HS256'] }
    });


  // Set up the session as the default strategy for all routes
  server.auth.default('session');

  // Initialize routes
  server.route(require('./routes'));
  server.route(require('./routes-api'));

  // Start the server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

// Handle errors
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();