'use strict';
const mongoose = require("mongoose");

const Bcrypt = require('bcrypt');
const Hapi=require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const database = require('./database');
const user = require('./user');

const login = require('./routes/login')
const signup = require('./routes/signup')


// Create a server with a host and port
const server=Hapi.server({
  host:'localhost',
  port:8000
});

const validate = async (request, username, password) => {

  if (!username || !password) {
    return { credentials: null, isValid: false };
  }

  // const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: username, password: password};

  return { isValid:true, credentials };
};


const start = async () => {

  const server = Hapi.server({ port: 8000 });

  await server.register(require('hapi-auth-basic'));

  server.auth.strategy('simple', 'basic', { validate });


  await server.register(AuthBearer)

  server.auth.strategy('token', 'bearer-access-token', {
    allowQueryToken: true,              // optional, false by default
    validate: async (request, token, h) => {

      // here is where you validate your token
      // comparing with token from your database for example
      const isValid = token === '1234';

      const credentials = { token };
      const artifacts = { test: 'info' };

      return { isValid, credentials, artifacts };
    }
  });


  server.route({
    method: 'GET',
    path: '/login',
    options: {
      auth: 'simple'
    },
    handler:login
  });

  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: 'token'
    },
    handler:(request, h)=>{
      console.log("h",h.request.auth)
      return {"status":"200","token":h.request.auth.credentials.token}
    }
  });

  server.route({
    method: 'POST',
    path: '/signup',
    options: {
    },
    handler:signup
  });



  await server.start();

  console.log('server running at: ' + server.info.uri);
};


start();
