'use strict';
const Bcrypt = require('bcrypt');
const Hapi=require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
// Create a server with a host and port
const server=Hapi.server({
  host:'localhost',
  port:8000
});

const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a',
    token:'sdfsdfsdfkjskjdfkjskdfjsdfsdfsdf'
  }
};

const validate = async (request, username, password) => {

  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name , token: user.token};

  return { isValid, credentials };
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
    handler:(request, h)=>{
      console.log("h",h.request.auth)
      return {"status":"200","token":h.request.auth.credentials.token}
    }
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



  await server.start();

  console.log('server running at: ' + server.info.uri);
};


start();
